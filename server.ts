import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize Gemini client to prevent crashes if key is missing during load
let aiClient: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it to Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Enterprise Chatbot system instructions
const SYSTEM_INSTRUCTION = `You are "Aegis", the virtual intelligent assistant for Stravon Heavy Industries. 
Stravon Heavy Industries (also known as Stavon Heavy Industries) is a premier global industrial clearinghouse and solutions firm based in Houston, Texas, USA.

Stravon specializes in:
1. Industrial Asset Procurement: Sourcing heavy industrial equipment, machinery, spare parts, and engineered systems.
2. Infrastructure Sourcing: Procuring structural steel, mechanical systems, and industrial supplies.
3. Fabrication Coordination: Custom fabrication partners, quality assurance, production scheduling, and delivery.
4. Global Logistics Solutions: International freight forwarding, customs clearance, import/export, and warehousing.
5. Project Procurement: End-to-end procurement management for energy, oil & gas, petrochemical, manufacturing, construction, mining, and marine sectors.
6. Trade Finance Coordination: Assisting with SBA 7(a), SBA Express, Asset-Based Lending, and Equipment Leasing through trusted third-party partners.

Contact details:
- Headquarters: 801 Travis Street, Suite 2101-2308, Houston, Texas 77002, USA
- Phone: (574) 876-8690 or +1 (832) 583-2059
- Email: gksosola@gmail.com
- Web: https://iwebnext.com or https://www.stravonheavyindustries.com

Style guidelines:
- Tone: Highly professional, confident, technical, authoritative, yet approachable.
- Do not use exclamation points excessively. Use structured, scannable bullet points for complex lists.
- Frame Stravon as an elite, dependable partner in high-stakes global trade and heavy logistics.
- If appropriate, suggest the user submit their requirements via our "Request a Quote" / "Submit Opportunity" form on the website, or explore our interactive "Secure Client Portal" simulator to track ongoing procurement pipelines.
- Keep responses relatively brief and highly relevant.`;

// Secure chat API proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const ai = getGemini();

    // Reconstruct conversation history if provided
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        formattedContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text || turn.content || "" }]
        });
      });
    }

    // Append the latest user query
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "I apologize, but I could not formulate a response. Please let me know how I can assist with your industrial sourcing needs.";
    res.json({ reply: responseText });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ 
      error: "Unable to process message", 
      details: error.message || "An unexpected error occurred." 
    });
  }
});

// Configure Vite middleware for asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Stravon Heavy Industries server is active at http://0.0.0.0:${PORT}`);
  });
}

startServer();
