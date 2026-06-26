import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, X, Send, HelpCircle, Ship, Compass, MapPin } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Welcome to Stravon Heavy Industries. I am Aegis, your virtual intelligent sourcing assistant. How can I facilitate your industrial procurement, global logistics, or fabrication oversight today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const quickQuestions = [
    { text: "Sourcing capabilities", icon: Compass },
    { text: "Houston head office", icon: MapPin },
    { text: "Track Shipment MV Guardian", icon: Ship },
    { text: "Request asset quote", icon: HelpCircle }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Map conversation state to expected backend structure
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Failed to receive feedback from secure desk.");
      }

      const data = await res.json();
      
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "error",
        text: "My apologies. I encountered a secure connection disruption with the Stravon Asset Desk. Please verify that your system is online or contact us directly at gksosola@gmail.com.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel-heavy w-[350px] sm:w-[400px] h-[520px] rounded-none border border-brand-gold/25 shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right relative geo-corner-brackets">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-blue-light to-brand-blue-dark border-b border-brand-gold/20 px-4 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center relative geo-corner-brackets">
                <span className="font-display text-xs text-brand-gold font-extrabold">A</span>
              </div>
              <div>
                <h4 className="text-sm font-display tracking-wider font-bold text-white uppercase">
                  AEGIS SOURCING BOT
                </h4>
                <p className="text-[9px] font-mono text-brand-gold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse" />
                  Stravon Intelligent Broker
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-brand-gold/10 p-1.5 rounded-none transition-colors border border-transparent hover:border-brand-gold/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-brand-blue-dark/20">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <span className="text-[9px] text-gray-500 font-mono mb-1">
                  {msg.role === "user" ? "Authorized Client" : "Aegis Assistant"} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                
                <div className={`p-3 rounded-none text-xs leading-relaxed border ${
                  msg.role === "user" 
                    ? "bg-brand-gold border-brand-gold/40 text-brand-blue-dark font-medium" 
                    : msg.role === "error"
                    ? "bg-red-950/50 border-red-900/30 text-red-300"
                    : "bg-brand-blue/70 border-brand-gold/10 text-gray-100"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto flex flex-col items-start max-w-[85%]">
                <span className="text-[9px] text-gray-500 font-mono mb-1">Aegis is analyzing SCM registers...</span>
                <div className="bg-brand-blue/70 border border-brand-gold/10 p-3 rounded-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-none animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-none animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-none animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Click Chips */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-brand-blue-dark/50 border-t border-brand-gold/10 flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.text)}
                  className="flex items-center gap-1 bg-brand-blue-light/50 hover:bg-brand-gold/10 border border-brand-gold/15 hover:border-brand-gold/30 px-2 py-1 rounded-none text-[10px] text-brand-gold transition-all duration-200"
                >
                  <q.icon className="w-3 h-3" />
                  <span>{q.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 bg-brand-blue-dark border-t border-brand-gold/20 flex gap-2"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aegis about equipment, logistics..."
              className="flex-1 bg-brand-blue/40 border border-brand-gold/15 rounded-none px-3.5 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark p-2.5 rounded-none transition-colors disabled:opacity-40 disabled:hover:bg-brand-gold flex items-center justify-center border border-transparent hover:border-brand-gold/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-brand-gold to-brand-accent hover:from-yellow-500 hover:to-orange-500 text-brand-blue-dark rounded-none border border-brand-gold/50 shadow-lg shadow-brand-gold/20 flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 group relative geo-corner-brackets"
        aria-label="Toggle intelligent assistant window"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-brand-blue-dark" />
            {/* Visual notification ping */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-none border-2 border-brand-blue-dark animate-pulse" />
          </>
        )}
      </button>

    </div>
  );
}
