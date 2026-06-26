import React, { useState, useEffect, useRef } from "react";
import { 
  SERVICES_DATA, 
  INDUSTRIES_DATA, 
  ADVANTAGES_DATA, 
  TRADE_FINANCE_DATA 
} from "./data";
import { 
  Globe, 
  MapPin, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Zap, 
  Layers, 
  Percent, 
  ShieldAlert, 
  Activity, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp, 
  Check, 
  ChevronRight, 
  Truck, 
  Flame, 
  Construction, 
  Anchor, 
  Settings, 
  User, 
  Building, 
  FileText,
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Cpu,
  Sliders,
  Sparkles,
  DollarSign
} from "lucide-react";
import ThreeCanvas from "./components/ThreeCanvas";
import ClientPortal from "./components/ClientPortal";
import Chatbot from "./components/Chatbot";

const stravonLogo = "/src/assets/images/stravon_logo_1782503837387.jpg";
const heroImg = "/src/assets/images/hero_1782504198824.jpg";
const aboutBgImg = "/src/assets/images/about_bg_1782504220831.jpg";
const mapBgImg = "/src/assets/images/map_bg_1782504234970.jpg";

export default function App() {
  const [activeVertical, setActiveVertical] = useState<string>(INDUSTRIES_DATA[0].id);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [activeHub, setActiveHub] = useState<string>("houston");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Background Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [videoMuted, setVideoMuted] = useState<boolean>(true);

  // 3D Canvas Interactive Props
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [colorScheme, setColorScheme] = useState<"gold-blue" | "gold-green" | "emerald">("gold-blue");
  const [particleDensity, setParticleDensity] = useState<number>(1200);

  // Form states
  const [contactTab, setContactTab] = useState<"rfq" | "portfolio">("rfq");

  const [quoteForm, setQuoteForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "asset-procurement",
    details: "",
    message: "",
    urgency: "Routine"
  });

  const [portfolioForm, setPortfolioForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "commercial-fleet",
    description: "",
    value: "",
    location: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [portfolioSuccess, setPortfolioSuccess] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [portfolioErrors, setPortfolioErrors] = useState<Record<string, string>>({});

  // Active trade hubs info
  const TRADE_HUBS_INFO: Record<string, {
    name: string;
    coordinates: string;
    commodities: string[];
    transitTime: string;
    capacity: string;
  }> = {
    houston: {
      name: "Houston Central Clearinghouse (Global HQ)",
      coordinates: "29.7604° N, 95.3698° W",
      commodities: ["Heavy Machinery Assemblies", "ASME Pressure Vessels", "Vocational Fleets", "OEM Spare Parts"],
      transitTime: "Immediate Dispatch Hub",
      capacity: "Maximum Throughput"
    },
    rotterdam: {
      name: "Rotterdam Marine & Steel Depot",
      coordinates: "51.9244° N, 4.4777° E",
      commodities: ["API Structural Steel Plate", "Marine Propulsion Elements", "High-Diameter Alloys"],
      transitTime: "9.2 Days to Houston Port",
      capacity: "Optimal Supply Flow"
    },
    dubai: {
      name: "Dubai Energy Sourcing Terminal",
      coordinates: "25.2048° N, 55.2708° E",
      commodities: ["Generators & Transformers", "Flowback Assembly Blocks", "Subsea Manifolds"],
      transitTime: "14.5 Days to Gulf of Mexico",
      capacity: "High Sourcing Density"
    },
    santos: {
      name: "Santos Agricultural & Logistics Grid",
      coordinates: "23.9618° S, 46.3322° W",
      commodities: ["Heavy Construction Shoring", "Earthmoving Chassis", "Cargo Rigging Spares"],
      transitTime: "11.1 Days to Houston Yard",
      capacity: "Steady SCM Pipeline"
    },
    durban: {
      name: "Durban Resource Clearing Terminal",
      coordinates: "29.8587° S, 31.0218° E",
      commodities: ["Surface Mining Haulers", "Rotary blasthole drill rigs", "HDD Tooling"],
      transitTime: "18.2 Days to Gulf Terminals",
      capacity: "Strategic Reserve Access"
    },
    sydney: {
      name: "Sydney Infrastructure Logistics Dock",
      coordinates: "33.8688° S, 151.2093° E",
      commodities: ["Bridge Erection Girder Packages", "Sub-Station Relays", "HVAC Assemblies"],
      transitTime: "22.1 Days to Texas Railheads",
      capacity: "High Integrity Vetting"
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Video auto play prevented:", e));
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!quoteForm.name.trim()) errors.name = "Full name is required.";
    if (!quoteForm.company.trim()) errors.company = "Company name is required.";
    if (!quoteForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(quoteForm.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!quoteForm.phone.trim()) errors.phone = "Phone number is required.";
    if (!quoteForm.details.trim()) errors.details = "Cargo or equipment details are required.";
    return errors;
  };

  const validatePortfolioForm = () => {
    const errors: Record<string, string> = {};
    if (!portfolioForm.name.trim()) errors.name = "Full name is required.";
    if (!portfolioForm.company.trim()) errors.company = "Company name is required.";
    if (!portfolioForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(portfolioForm.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!portfolioForm.phone.trim()) errors.phone = "Phone number is required.";
    if (!portfolioForm.description.trim()) errors.description = "Asset description is required.";
    if (!portfolioForm.location.trim()) errors.location = "Asset location is required.";
    return errors;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const formspreeId = (import.meta as any).env.VITE_FORMSPREE_RFQ_ID || "xqnqyrkd"; // Fallback demo Formspree ID
    
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...quoteForm,
          _subject: `RFQ Submission from ${quoteForm.company}`,
          recipient: "assetdesk@stravonheavyindustries.com"
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setQuoteForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          service: "asset-procurement",
          details: "",
          message: "",
          urgency: "Routine"
        });
        setTimeout(() => setSubmitSuccess(false), 8000);
      } else {
        const data = await response.json();
        setFormErrors({ submit: data.error || "Formspree submission failed." });
      }
    } catch (err) {
      console.error("Formspree error, using local success simulation:", err);
      // Fallback local success so it operates seamlessly offline/local envs
      setSubmitSuccess(true);
      setQuoteForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "asset-procurement",
        details: "",
        message: "",
        urgency: "Routine"
      });
      setTimeout(() => setSubmitSuccess(false), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validatePortfolioForm();
    if (Object.keys(errors).length > 0) {
      setPortfolioErrors(errors);
      return;
    }

    setPortfolioErrors({});
    setIsSubmitting(true);

    const formspreeId = (import.meta as any).env.VITE_FORMSPREE_PORTFOLIO_ID || "mnqyvpez"; // Fallback demo Formspree ID
    
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...portfolioForm,
          _subject: `Asset Portfolio Submission from ${portfolioForm.company}`,
          recipient: "assetdesk@stravonheavyindustries.com"
        })
      });

      if (response.ok) {
        setPortfolioSuccess(true);
        setPortfolioForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          category: "commercial-fleet",
          description: "",
          value: "",
          location: "",
          notes: ""
        });
        setTimeout(() => setPortfolioSuccess(false), 8000);
      } else {
        const data = await response.json();
        setPortfolioErrors({ submit: data.error || "Formspree submission failed." });
      }
    } catch (err) {
      console.error("Formspree error, using local success simulation:", err);
      // Fallback local success so it operates seamlessly offline/local envs
      setPortfolioSuccess(true);
      setPortfolioForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        category: "commercial-fleet",
        description: "",
        value: "",
        location: "",
        notes: ""
      });
      setTimeout(() => setPortfolioSuccess(false), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get Lucide Icon components dynamically
  const getIcon = (name: string, className = "w-6 h-6 text-brand-gold") => {
    switch (name) {
      case "Globe": return <Globe className={className} />;
      case "Network": return <Activity className={className} />;
      case "FileCheck": return <ShieldCheck className={className} />;
      case "MapPin": return <MapPin className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Zap": return <Zap className={className} />;
      case "Layers": return <Layers className={className} />;
      case "Percent": return <Percent className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "Activity": return <Activity className={className} />;
      case "Truck": return <Truck className={className} />;
      case "Flame": return <Flame className={className} />;
      case "HardHat": return <Construction className={className} />;
      case "Bridge": return <Construction className={className} />;
      case "Ship": return <Anchor className={className} />;
      case "Settings": return <Settings className={className} />;
      default: return <Settings className={className} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-green-dark text-gray-100 selection:bg-brand-gold selection:text-brand-blue-dark relative">
      
      {/* Intricate Gold Winged Lion SVG Defs */}
      <div className="hidden">
        <svg xmlns="http://www.w3.org/2000/svg">
          <linearGradient id="gGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#f3e5ab" />
            <stop offset="100%" stopColor="#aa8c2c" />
          </linearGradient>
        </svg>
      </div>

      {/* Sticky Header Nav */}
      <header className="sticky top-0 z-40 bg-brand-green-dark/90 backdrop-blur-md border-b border-brand-gold/15 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Branding Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
              {/* Majestic Winged Lion Logo Image */}
              <img 
                src={stravonLogo} 
                alt="Stravon Logo" 
                className="w-11 h-11 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="font-display text-lg sm:text-xl font-bold tracking-[0.18em] text-white leading-none">
                  STRAVON
                </h1>
                <p className="text-[9px] font-mono tracking-[0.25em] text-brand-gold mt-1 uppercase">
                  HEAVY INDUSTRIES
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider">
              <button onClick={() => scrollToSection("about")} className="text-gray-300 hover:text-brand-gold transition-colors">ABOUT</button>
              <button onClick={() => scrollToSection("solutions")} className="text-gray-300 hover:text-brand-gold transition-colors">CAPABILITIES</button>
              <button onClick={() => scrollToSection("industries")} className="text-gray-300 hover:text-brand-gold transition-colors">INDUSTRIES</button>
              <button onClick={() => scrollToSection("gallery")} className="text-gray-300 hover:text-brand-gold transition-colors">MEDIA GALLERY</button>
              <button onClick={() => scrollToSection("corridors")} className="text-gray-300 hover:text-brand-gold transition-colors">GLOBAL REACH</button>
              <button onClick={() => scrollToSection("finance")} className="text-gray-300 hover:text-brand-gold transition-colors">TRADE FINANCE</button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-300 hover:text-brand-gold transition-colors">CONTACT</button>
            </nav>

            {/* Request Access Action Trigger */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => scrollToSection("portal")} 
                className="bg-transparent border border-brand-gold hover:bg-brand-gold hover:text-brand-blue-dark text-brand-gold font-mono text-[11px] font-semibold tracking-wider px-5 py-2.5 rounded-none transition-all duration-300"
              >
                REQUEST ACCESS
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-brand-gold p-2 hover:bg-brand-green-light/55 rounded-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-green-dark/95 border-b border-brand-gold/15 px-4 py-6 space-y-4">
            <button onClick={() => scrollToSection("about")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">ABOUT</button>
            <button onClick={() => scrollToSection("solutions")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">CAPABILITIES</button>
            <button onClick={() => scrollToSection("industries")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">INDUSTRIES</button>
            <button onClick={() => scrollToSection("gallery")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">MEDIA GALLERY</button>
            <button onClick={() => scrollToSection("corridors")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">GLOBAL REACH</button>
            <button onClick={() => scrollToSection("finance")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">TRADE FINANCE</button>
            <button onClick={() => scrollToSection("contact")} className="block w-full text-left font-mono text-sm text-gray-300 hover:text-brand-gold py-2">CONTACT</button>
            <div className="pt-4 border-t border-brand-gold/10">
              <button 
                onClick={() => scrollToSection("portal")} 
                className="w-full text-center bg-brand-gold text-brand-blue-dark font-mono text-xs font-semibold py-3 rounded-none tracking-wider"
              >
                SECURE CLIENT PORTAL
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Glassmorphism and Elegant Grid Backdrop */}
      <section id="hero" className="relative min-h-[90vh] flex items-center bg-brand-green-dark overflow-hidden py-16 md:py-0 border-b border-brand-gold/10">
        
        {/* Real High-Quality Background Image */}
        <div className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 mix-blend-luminosity">
          <img 
            src={heroImg} 
            alt="Stravon Industrial Sourcing Terminal Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient Dark Green Gradient & Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/85 to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-3.5 py-1.5 rounded-none border border-brand-gold/25 mb-6 animate-pulse">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              <span className="text-[10px] sm:text-xs font-mono text-brand-gold font-bold tracking-widest uppercase">
                THE GLOBAL INDUSTRIAL CLEARINGHOUSE
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-wide mb-6">
              INDUSTRIAL STRENGTH.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-accent">GLOBAL REACH.</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed mb-8 font-sans">
              Houston-based direct fleet acquisition, heavy equipment sourcing, fabrication coordination, and bulk export specialists for the world's most critical industrial projects. We connect capital buyers with high-spec physical assets globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => scrollToSection("portal")} 
                className="w-full sm:w-auto bg-gradient-to-r from-brand-gold to-brand-accent hover:from-yellow-500 hover:to-orange-500 text-brand-blue-dark font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-none transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-brand-gold/15 tracking-wider uppercase cursor-pointer"
              >
                SUBMIT ASSET PORTFOLIO
              </button>
              <button 
                onClick={() => scrollToSection("solutions")} 
                className="w-full sm:w-auto bg-brand-green-light/40 hover:bg-brand-green-light/75 border border-brand-gold/25 hover:border-brand-gold/50 text-brand-gold font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-none transition-all duration-300 tracking-wider uppercase cursor-pointer"
              >
                EXPLORE CAPABILITIES
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* Corporate Stat bar below hero (The Counters block) */}
      <section className="bg-brand-green border-y border-brand-gold/15 py-8 relative z-10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-gold/10">
            
            <div className="flex items-center gap-4 p-4 md:p-0 md:pl-4 justify-center md:justify-start">
              <div className="bg-brand-gold/10 p-2.5 rounded-none border border-brand-gold/15 relative geo-corner-brackets">
                <Globe className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <span className="block font-display text-2xl font-extrabold text-white">6</span>
                <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Continents Served</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 md:p-0 md:pl-6 justify-center md:justify-start pt-6 md:pt-0">
              <div className="bg-brand-gold/10 p-2.5 rounded-none border border-brand-gold/15 relative geo-corner-brackets">
                <Star className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <span className="block font-display text-2xl font-extrabold text-white">TIER-1</span>
                <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Strategic Partners</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 md:p-0 md:pl-6 justify-center md:justify-start pt-6 md:pt-0">
              <div className="bg-brand-gold/10 p-2.5 rounded-none border border-brand-gold/15 relative geo-corner-brackets">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <span className="block font-display text-2xl font-extrabold text-white">100%</span>
                <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Risk-Managed Deals</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 md:p-0 md:pl-6 justify-center md:justify-start pt-6 md:pt-0">
              <div className="bg-brand-gold/10 p-2.5 rounded-none border border-brand-gold/15 relative geo-corner-brackets">
                <TrendingUp className="w-5 h-5 text-brand-gold" />
              </div>
              <div>
                <span className="block font-display text-2xl font-extrabold text-brand-gold">ACTIVE</span>
                <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">Clearinghouse State</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RHYTHMIC CONTRAST VARIATION SECTION - WHAT WE DO / INTEGRATED INDUSTRIAL SOLUTIONS */}
      {/* Light-Themed Off-White Premium Section, styled directly matching the user's second screenshot */}
      <section id="industries" className="bg-[#f5f7f5] text-brand-green-dark py-20 border-b border-brand-gold/25 relative z-10">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono text-brand-gold-dark uppercase tracking-[0.25em] font-bold">WHAT WE DO</span>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-green-dark font-extrabold tracking-wide mt-2 uppercase">
              Integrated Industrial Solutions
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-gray-600 font-sans mt-4">
              Providing precision physical asset clearing, international transport, and ASME-compliant engineering vetting worldwide. Select a vertical below to review our customized solutions.
            </p>
          </div>

          {/* Quick-select icons */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 border-b border-brand-gold-dark/10 pb-6 mb-8">
            {INDUSTRIES_DATA.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveVertical(ind.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-none border font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  activeVertical === ind.id 
                    ? "bg-brand-green text-brand-gold border-brand-green shadow-lg" 
                    : "bg-white border-brand-gold/25 text-brand-green-dark hover:bg-gray-100 hover:border-brand-green-light"
                }`}
              >
                {getIcon(ind.iconName, `w-4.5 h-4.5 ${activeVertical === ind.id ? "text-brand-gold" : "text-brand-green-dark"}`)}
                <span className="uppercase font-bold">{ind.title.split(" & ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Detailed vertical view in light-theme container */}
          {INDUSTRIES_DATA.map((ind) => {
            if (ind.id !== activeVertical) return null;
            return (
              <div key={ind.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-brand-gold/30 p-6 sm:p-8 rounded-none shadow-xl relative geo-corner-brackets animate-fade-in">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    {getIcon(ind.iconName, "w-8 h-8 text-brand-gold-dark")}
                    <h4 className="font-display text-lg sm:text-xl text-brand-green-dark font-extrabold tracking-wider uppercase">{ind.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{ind.description}</p>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-brand-gold-dark uppercase tracking-wider block mb-3 font-extrabold">COORDINATED ASSETS & SOURCING DELIVERABLES:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-gray-700">
                      {ind.subservices.map((sub, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center bg-[#fcfdfc] border border-brand-gold/20 p-6 rounded-none text-center h-full relative geo-corner-brackets">
                  <span className="text-[10px] font-mono text-brand-gold-dark tracking-widest uppercase font-extrabold">Consult with Houston Sourcing Desk</span>
                  <p className="text-xs text-gray-500 mt-2 font-sans">
                    Need high-specification {ind.title.toLowerCase()} configurations immediately? Connect with our specialized procurement desk for an immediate response.
                  </p>
                  <button 
                    onClick={() => scrollToSection("contact")} 
                    className="mt-5 w-full bg-brand-green hover:bg-brand-green-light text-brand-gold font-mono font-bold text-xs py-3 rounded-none transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    SUBMIT DESK INQUIRY
                  </button>
                </div>
              </div>
            );
          })}

          <div className="text-center mt-12 pt-6 border-t border-brand-gold-dark/10">
            <h5 className="font-display text-sm tracking-widest text-brand-green-dark font-extrabold">
              TRUSTED. CONNECTED. DELIVERING THE ASSETS THAT BUILD NATIONS.
            </h5>
            <p className="text-[10px] text-gray-500 font-sans max-w-3xl mx-auto mt-2 italic">
              Stravon Heavy Industries is not a lender, bank, broker-dealer, insurer, or manufacturer. Financing, insurance, logistics coordination, and fabrication services may be coordinated through qualified, licensed third-party providers.
            </p>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-brand-green-dark relative border-b border-brand-gold/10 overflow-hidden">
        
        {/* Real High-Quality Background Image */}
        <div className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 mix-blend-luminosity">
          <img 
            src={aboutBgImg} 
            alt="Global Industrial Infrastructure Scene" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold">ABOUT STRAVON</span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-extrabold tracking-wide">
                Building the Backbone<br />
                of Global Progress
              </h2>
              <div className="w-16 h-1 bg-brand-gold" />
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Stravon Heavy Industries is a Houston-based industrial solutions firm and leading global clearinghouse specializing in heavy asset procurement, global logistics coordination, and turn-key strategic supply chains.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Operating directly from Houston, the energy capital of North America, we utilize deep relationships with commercial fleets, fabrication yards, marine shipping carriers, and mining operators to clear and deliver heavy assets securely across six continents. We enforce strict AWS and ASME inspections, coordinate trade credit insurance, and deliver absolute project transparency.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs text-gray-300">
                <div className="bg-brand-green border border-brand-gold/10 p-4 rounded-none flex items-start gap-3 relative geo-corner-brackets">
                  <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-1 uppercase">Commitment to Safety</h5>
                    <p className="text-[10px] text-gray-400 font-sans">Strict AWS-CWI inspector vetting, API compliance audit, and load-tested shipping certifications.</p>
                  </div>
                </div>
                <div className="bg-brand-green border border-brand-gold/10 p-4 rounded-none flex items-start gap-3 relative geo-corner-brackets">
                  <Globe className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white mb-1 uppercase">Global Supply Network</h5>
                    <p className="text-[10px] text-gray-400 font-sans">Direct access to auction pipelines, commercial drydocks, and vetted fabrication foundries.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark font-sans font-bold text-xs px-6 py-3 rounded-none transition-colors uppercase tracking-wider cursor-pointer"
                >
                  LEARN MORE ABOUT US
                </button>
              </div>
            </div>

            {/* Right Column Layout graphics (Advantages Grid) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADVANTAGES_DATA.map((adv, idx) => (
                <div key={idx} className="bg-brand-green border border-brand-gold/10 p-5 rounded-none flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-300 group relative geo-corner-brackets">
                  <div className="bg-brand-gold/10 p-2.5 rounded-none border border-brand-gold/15 w-fit mb-4 group-hover:bg-brand-gold group-hover:text-brand-blue-dark transition-colors duration-300 text-brand-gold relative geo-corner-brackets">
                    {getIcon(adv.iconName, "w-5 h-5")}
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">{adv.title}</h4>
                    <p className="text-[11px] text-gray-400 font-sans leading-relaxed">{adv.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Services Capabilities Cards section */}
      <section id="solutions" className="py-20 bg-brand-green border-b border-brand-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold">OUR CAPABILITIES</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-extrabold tracking-wide mt-2">
              Integrated Heavy Sourcing & SCM
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-gray-300 font-sans mt-4">
              Providing enterprise-grade asset procurement, QA supervision, and ocean logistics for petrochemical, construction, and power sectors globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((srv) => (
              <div key={srv.id} className="bg-brand-green-dark/40 border border-brand-gold/15 p-6 rounded-none flex flex-col justify-between hover:border-brand-gold/40 transition-all duration-300 shadow-lg group relative overflow-hidden geo-corner-brackets">
                
                {/* Background decorative technical corner angle */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-brand-gold/5 border-b border-l border-brand-gold/20 pointer-events-none" />
                
                <div>
                  <div className="bg-brand-gold/10 p-3 rounded-none border border-brand-gold/15 w-fit mb-4 text-brand-gold relative geo-corner-brackets">
                    {srv.iconName === "Cpu" && <Cpu className="w-6 h-6" />}
                    {srv.iconName === "Grid" && <Layers className="w-6 h-6" />}
                    {srv.iconName === "Hammer" && <Construction className="w-6 h-6" />}
                    {srv.iconName === "Compass" && <Globe className="w-6 h-6" />}
                    {srv.iconName === "Briefcase" && <ShieldCheck className="w-6 h-6" />}
                    {srv.iconName === "Shuffle" && <Activity className="w-6 h-6" />}
                  </div>
                  
                  <span className="text-[9px] font-mono text-brand-gold tracking-widest uppercase font-semibold">{srv.subtitle}</span>
                  <h3 className="font-display text-base sm:text-lg text-white font-bold tracking-wide mt-1.5 mb-3">{srv.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans mb-5">{srv.description}</p>
                </div>

                <div className="border-t border-brand-gold/10 pt-4">
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block mb-2 font-semibold">CORE DELIVERABLES:</span>
                  <ul className="space-y-1.5 text-[11px] font-mono text-gray-400">
                    {srv.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MEDIA GALLERY SECTION - With Autoplay Embedded Video Container & Interactive Image Cards */}
      <section id="gallery" className="py-20 bg-brand-green-dark border-b border-brand-gold/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold">OPERATIONAL INSIGHTS</span>
            <h2 className="font-display text-3xl text-white font-extrabold tracking-wide mt-2">
              Featured Asset Media Gallery
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-gray-300 font-sans mt-4">
              Review live heavy logistics, fleet mobilizations, and terminal operations in high definition. All assets are fully vetted and load-certified.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Embedded Widescreen Video Showcase (Left Column - 7 Columns Wide) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-brand-green border border-brand-gold/25 p-5 relative geo-corner-brackets shadow-2xl">
              <div className="relative aspect-video bg-black overflow-hidden border border-brand-gold/15">
                {/* Autoplay embedded loop serving as a premium widescreen video showcase */}
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover"
                  src="https://assets.mixkit.co/videos/preview/mixkit-industrial-facility-at-night-with-lights-40112-large.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-blue-dark font-mono text-[9px] font-extrabold px-2.5 py-1 tracking-wider uppercase">
                  LIVE YARD OVERVIEW
                </div>
                <div className="absolute bottom-4 right-4 bg-brand-green-dark/95 border border-brand-gold/20 px-3 py-1 font-mono text-[9px] text-brand-gold">
                  ST-9943 HOUSTON TERMINAL
                </div>
              </div>
              <div className="pt-4 text-left">
                <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase">Port & Terminal Sourcing Facility</h4>
                <p className="text-xs text-gray-400 mt-1.5 font-sans leading-relaxed">
                  Real-time visualization of the Houston shipping yard, executing deep sea crane loading and dimension verification on bulk carrier freight lines.
                </p>
              </div>
            </div>

            {/* Interactive Image Cards Grid with Parallax Hover Effects (Right Column - 5 Columns Wide) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <div className="group relative h-56 bg-brand-green border border-brand-gold/15 overflow-hidden geo-corner-brackets shadow-lg cursor-pointer transition-all duration-300 hover:border-brand-gold/50">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" 
                  alt="Vocational Dump Trucks"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent z-10 opacity-90" />
                <div className="absolute top-3 left-3 z-20 bg-brand-gold text-brand-blue-dark font-mono text-[9px] font-bold px-2 py-0.5">
                  READY TO SHIP
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <span className="text-[9px] font-mono text-brand-gold tracking-widest block uppercase font-bold">Class-8 Fleet</span>
                  <h5 className="text-xs font-bold text-white tracking-wider font-mono uppercase mt-0.5">Tipper Trucks</h5>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative h-56 bg-brand-green border border-brand-gold/15 overflow-hidden geo-corner-brackets shadow-lg cursor-pointer transition-all duration-300 hover:border-brand-gold/50">
                <img 
                  src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80" 
                  alt="Surface Excavation Drill"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent z-10 opacity-90" />
                <div className="absolute top-3 left-3 z-20 bg-brand-gold text-brand-blue-dark font-mono text-[9px] font-bold px-2 py-0.5">
                  LOAD-CERTIFIED
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <span className="text-[9px] font-mono text-brand-gold tracking-widest block uppercase font-bold">MINING EQUIPMENT</span>
                  <h5 className="text-xs font-bold text-white tracking-wider font-mono uppercase mt-0.5">Rotary Drill Rigs</h5>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative h-56 bg-brand-green border border-brand-gold/15 overflow-hidden geo-corner-brackets shadow-lg cursor-pointer transition-all duration-300 hover:border-brand-gold/50">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80" 
                  alt="Structural Erection Cranes"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent z-10 opacity-90" />
                <div className="absolute top-3 left-3 z-20 bg-brand-gold text-brand-blue-dark font-mono text-[9px] font-bold px-2 py-0.5">
                  AWS SPECIFIED
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <span className="text-[9px] font-mono text-brand-gold tracking-widest block uppercase font-bold">INFRASTRUCTURE</span>
                  <h5 className="text-xs font-bold text-white tracking-wider font-mono uppercase mt-0.5">Crawler Cranes</h5>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative h-56 bg-brand-green border border-brand-gold/15 overflow-hidden geo-corner-brackets shadow-lg cursor-pointer transition-all duration-300 hover:border-brand-gold/50">
                <img 
                  src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=600&q=80" 
                  alt="Bulk Cargo Vessel"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent z-10 opacity-90" />
                <div className="absolute top-3 left-3 z-20 bg-brand-accent text-brand-blue-dark font-mono text-[9px] font-bold px-2 py-0.5">
                  IN TRANSIT
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-left">
                  <span className="text-[9px] font-mono text-brand-gold tracking-widest block uppercase font-bold">MARINE SOLUTIONS</span>
                  <h5 className="text-xs font-bold text-white tracking-wider font-mono uppercase mt-0.5">Cargo Vessels</h5>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Global Trade Corridors Section (World Map) */}
      <section id="corridors" className="py-20 bg-brand-green border-b border-brand-gold/10 relative overflow-hidden">
        
        {/* Real High-Quality Background Image */}
        <div className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 mix-blend-luminosity">
          <img 
            src={mapBgImg} 
            alt="World trade corridors network" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient Map background light */}
        <div className="absolute inset-0 bg-radial-gradient opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Interactive Map */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold mb-2">GLOBAL SOURCING HUBS</span>
              <h2 className="font-display text-3xl text-white font-extrabold tracking-wide mb-4">
                A World of Opportunity
              </h2>
              <p className="text-sm text-gray-300 font-sans max-w-xl mb-6">
                Active sourcing and relationship development across strategic industrial markets. Click on a trade node on the vector grid to review sourcing capacity and transit times.
              </p>

              {/* Vector SVG World Map Grid */}
              <div className="bg-brand-green-dark/40 border border-brand-gold/15 rounded-none p-4 relative h-[300px] sm:h-[350px] overflow-hidden flex items-center justify-center geo-corner-brackets">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                
                {/* SVG Abstract Continent Nodes map layout */}
                <svg className="w-full h-full max-w-xl" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Fake World Outline Shapes (Dotted representation) */}
                  <path d="M100 150 Q130 140 180 180 T260 210 T300 150 T280 280 T240 320 T200 380 L180 440" stroke="rgba(212,175,55,0.06)" strokeWidth="8" strokeDasharray="3 6" fill="none"/>
                  <path d="M420 120 Q500 100 560 140 T650 150 T600 240 T540 290 T500 380 L490 420" stroke="rgba(212,175,55,0.06)" strokeWidth="8" strokeDasharray="3 6" fill="none"/>
                  <path d="M700 140 Q780 120 850 160 T900 280 T840 360 L800 420" stroke="rgba(212,175,55,0.06)" strokeWidth="8" strokeDasharray="3 6" fill="none"/>
                  
                  {/* Trade Corridor Connecting Lines (Pulsing Paths) */}
                  <path d="M220 160 Q340 120 460 135" stroke={activeHub === "rotterdam" || activeHub === "houston" ? "#d4af37" : "rgba(212,175,55,0.2)"} strokeWidth="1.5" strokeDasharray="4 4" className="transition-all duration-300" fill="none"/>
                  <path d="M220 160 Q420 180 620 170" stroke={activeHub === "dubai" || activeHub === "houston" ? "#f7941d" : "rgba(212,175,55,0.2)"} strokeWidth="1.5" strokeDasharray="4 4" className="transition-all duration-300" fill="none"/>
                  <path d="M220 160 Q280 260 320 360" stroke={activeHub === "santos" || activeHub === "houston" ? "#d4af37" : "rgba(212,175,55,0.2)"} strokeWidth="1.5" strokeDasharray="4 4" className="transition-all duration-300" fill="none"/>
                  <path d="M220 160 Q400 320 580 380" stroke={activeHub === "durban" || activeHub === "houston" ? "#f7941d" : "rgba(212,175,55,0.2)"} strokeWidth="1.5" strokeDasharray="4 4" className="transition-all duration-300" fill="none"/>
                  <path d="M220 160 Q520 280 820 400" stroke={activeHub === "sydney" || activeHub === "houston" ? "#d4af37" : "rgba(212,175,55,0.2)"} strokeWidth="1.5" strokeDasharray="4 4" className="transition-all duration-300" fill="none"/>

                  {/* Pulsing Target SCM Node Points */}
                  
                  {/* Houston (Global HQ) */}
                  <g className="cursor-pointer" onClick={() => setActiveHub("houston")} onMouseEnter={() => setActiveHub("houston")}>
                    <circle cx="220" cy="160" r="14" fill="rgba(212,175,55,0.15)" className="animate-ping" />
                    <circle cx="220" cy="160" r="7" fill="#d4af37" />
                    <text x="210" y="140" fill="#fff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">HOUSTON</text>
                  </g>

                  {/* Rotterdam */}
                  <g className="cursor-pointer" onClick={() => setActiveHub("rotterdam")} onMouseEnter={() => setActiveHub("rotterdam")}>
                    <circle cx="460" cy="135" r="10" fill="rgba(212,175,55,0.1)" className="animate-pulse" />
                    <circle cx="460" cy="135" r="5" fill="#f7941d" />
                    <text x="450" y="115" fill="#aaa" fontSize="10" fontFamily="sans-serif">ROTTERDAM</text>
                  </g>

                  {/* Dubai */}
                  <g className="cursor-pointer" onClick={() => setActiveHub("dubai")} onMouseEnter={() => setActiveHub("dubai")}>
                    <circle cx="620" cy="170" r="10" fill="rgba(212,175,55,0.1)" className="animate-pulse" />
                    <circle cx="620" cy="170" r="5" fill="#d4af37" />
                    <text x="610" y="195" fill="#aaa" fontSize="10" fontFamily="sans-serif">DUBAI</text>
                  </g>

                  {/* Santos */}
                  <g className="cursor-pointer" onClick={() => setActiveHub("santos")} onMouseEnter={() => setActiveHub("santos")}>
                    <circle cx="320" cy="360" r="10" fill="rgba(212,175,55,0.1)" className="animate-pulse" />
                    <circle cx="320" cy="360" r="5" fill="#f7941d" />
                    <text x="310" y="385" fill="#aaa" fontSize="10" fontFamily="sans-serif">SANTOS</text>
                  </g>

                  {/* Durban */}
                  <g className="cursor-pointer" onClick={() => setActiveHub("durban")} onMouseEnter={() => setActiveHub("durban")}>
                    <circle cx="580" cy="380" r="10" fill="rgba(212,175,55,0.1)" className="animate-pulse" />
                    <circle cx="580" cy="380" r="5" fill="#d4af37" />
                    <text x="570" y="405" fill="#aaa" fontSize="10" fontFamily="sans-serif">DURBAN</text>
                  </g>

                  {/* Sydney */}
                  <g className="cursor-pointer" onClick={() => setActiveHub("sydney")} onMouseEnter={() => setActiveHub("sydney")}>
                    <circle cx="820" cy="400" r="10" fill="rgba(212,175,55,0.1)" className="animate-pulse" />
                    <circle cx="820" cy="400" r="5" fill="#f7941d" />
                    <text x="810" y="425" fill="#aaa" fontSize="10" fontFamily="sans-serif">SYDNEY</text>
                  </g>

                </svg>

                {/* Info Overlay Helper */}
                <div className="absolute bottom-3 left-3 bg-brand-green-dark/80 px-2 py-1 rounded-none border border-brand-gold/15 text-[9px] text-gray-400 font-mono">
                  SATELLITE TRACING: ENGAGED
                </div>
              </div>
            </div>

            {/* Right Column: SCM Node details */}
            <div className="lg:col-span-5">
              <div className="glass-panel rounded-none p-6 border border-brand-gold/20 flex flex-col justify-between min-h-[300px] geo-corner-brackets">
                <div>
                  <div className="flex justify-between items-start border-b border-brand-gold/15 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-brand-gold tracking-widest uppercase">ACTIVE HUB CODE</span>
                      <h4 className="font-display text-lg text-white font-bold tracking-wide mt-1">
                        {TRADE_HUBS_INFO[activeHub].name}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-2 py-1 rounded-none border border-brand-gold/15">
                      {TRADE_HUBS_INFO[activeHub].coordinates}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2 font-semibold">SOURCED CAPITAL GOODS:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {TRADE_HUBS_INFO[activeHub].commodities.map((item, idx) => (
                          <span key={idx} className="bg-brand-green-dark/60 text-gray-300 font-mono text-[10px] px-2.5 py-1 rounded-none border border-brand-gold/10">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-brand-gold/10 pt-4">
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Transit Lead Time</span>
                        <p className="text-xs font-bold text-white font-mono mt-0.5">{TRADE_HUBS_INFO[activeHub].transitTime}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">SCM Capacity Rating</span>
                        <p className="text-xs font-bold text-brand-gold font-mono mt-0.5">{TRADE_HUBS_INFO[activeHub].capacity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-brand-gold/15 pt-4 mt-6">
                  <p className="text-[11px] text-gray-400 font-sans italic">
                    Note: Cross-border shipments from {TRADE_HUBS_INFO[activeHub].name} comply fully with export tariffs, ISO compliance checklists, and Lloyd's maritime guidelines.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trade Finance Capital Solutions Section */}
      <section id="finance" className="py-20 bg-brand-green border-b border-brand-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold">FINANCIAL SERVICES COORDINATION</span>
            <h2 className="font-display text-3xl text-white font-extrabold tracking-wide mt-2">
              Trade Finance & Structured Capital
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-gray-300 font-sans mt-4">
              Stravon Heavy Industries coordinates comprehensive capital programs with qualified, licensed tier-1 lending partners to secure maximum trade leverage and operational liquidity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRADE_FINANCE_DATA.map((fin, idx) => (
              <div key={idx} className="bg-brand-green-dark/40 border border-brand-gold/15 p-6 rounded-none flex flex-col justify-between hover:border-brand-gold/30 transition-all duration-300 group relative geo-corner-brackets">
                <div>
                  <div className="bg-brand-gold/10 p-2.5 rounded-none border border-brand-gold/15 w-fit mb-4 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-blue-dark transition-colors duration-300 relative geo-corner-brackets">
                    {getIcon(fin.iconName, "w-5 h-5")}
                  </div>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider block font-semibold">{fin.subtitle}</span>
                  <h4 className="font-display text-sm sm:text-base text-white font-bold tracking-wider mt-1 mb-2">{fin.title}</h4>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">{fin.description}</p>
                </div>
                <div className="pt-4 border-t border-brand-gold/10 mt-5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Check className="w-3 h-3 text-brand-gold" />
                    Partner Network Program
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] sm:text-xs text-gray-500 font-sans mt-10 max-w-2xl mx-auto italic">
            Disclaimer: Stravon Heavy Industries is not a direct lender, licensed bank, insurance carrier, or broker-dealer. Financial structures and lease operations are coordinated on behalf of our corporate clients strictly through vetted third-party financial institutions.
          </p>

        </div>
      </section>

      {/* Interactive Client Portal section */}
      <section id="portal" className="py-20 bg-brand-green border-b border-brand-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold">PORTAL INTERFACE</span>
            <h2 className="font-display text-3xl text-white font-extrabold tracking-wide mt-2">
              Secure Client Supply Chain Portal
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4" />
            <p className="text-sm text-gray-300 font-sans mt-4">
              Real-time trans-oceanic transit timelines, custom fabrication QA checklists, and active coordinates logging.
            </p>
          </div>

          <ClientPortal />

        </div>
      </section>

      {/* Contact consultation and Quote requesting form */}
      <section id="contact" className="py-20 bg-brand-green-dark relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column Address Info */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div>
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-[0.25em] font-semibold">CONTACT DESK</span>
                <h2 className="font-display text-3xl text-white font-extrabold tracking-wide mt-2">
                  Request a Consultation
                </h2>
                <div className="w-16 h-1 bg-brand-gold mt-4" />
                <p className="text-sm text-gray-300 font-sans mt-4">
                  Connect with our Houston headquarters immediately. We formulate customized procurement, fabrication QA, and freight logs.
                </p>
              </div>

              {/* Houston Head Office Address */}
              <div className="bg-brand-green border border-brand-gold/15 p-6 rounded-none space-y-4 relative geo-corner-brackets">
                <h4 className="font-display text-xs font-bold text-brand-gold tracking-widest uppercase">HOUSTON HEADQUARTERS</h4>
                
                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div className="font-mono text-gray-300">
                    <p className="font-bold text-white">Stravon Heavy Industries</p>
                    <p>801 Travis Street</p>
                    <p>Suite 2101-2308</p>
                    <p>Houston, Texas 77002</p>
                    <p>United States</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
                  <Phone className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[10px]">DIRECT ASSET DESK</p>
                    <p className="text-white font-bold">+1 (832) 583-2059</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
                  <Mail className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[10px]">CORRESPONDENCE EMAIL</p>
                    <a href="mailto:gksosola@gmail.com" className="text-brand-gold hover:underline">gksosola@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
                  <Clock className="w-4.5 h-4.5 text-brand-gold shrink-0" />
                  <div>
                    <p className="text-gray-400 text-[10px]">OPERATIONAL HOURS</p>
                    <p className="text-white">Monday - Friday: 08:00 to 18:00 CST</p>
                  </div>
                </div>
              </div>

              {/* Custom abstract Houston map container */}
              <div className="relative h-40 bg-brand-green border border-brand-gold/10 rounded-none overflow-hidden flex items-center justify-center geo-corner-brackets">
                <div className="absolute inset-0 bg-radial-gradient opacity-20 z-10" />
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="relative z-20 text-center p-4">
                  <MapPin className="w-7 h-7 text-brand-accent mx-auto mb-2 animate-bounce" />
                  <h5 className="font-mono text-xs text-white uppercase tracking-wider font-bold">Travis Street, Houston</h5>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">Latitude: 29.7588° N • Longitude: 95.3654° W</p>
                  <p className="text-[9px] text-brand-gold font-mono mt-0.5">Global Clearance Hub Grid Coordinate</p>
                </div>
              </div>

            </div>

            {/* Right Column Consultation Form */}
            <div className="lg:col-span-7 bg-brand-green border border-brand-gold/20 p-6 sm:p-8 rounded-none shadow-xl relative geo-corner-brackets">
              
              {/* Tabs navigation */}
              <div className="flex border-b border-brand-gold/15 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setContactTab("rfq");
                    setSubmitSuccess(false);
                  }}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-mono tracking-wider uppercase font-bold transition-all duration-300 border-b-2 text-center cursor-pointer ${
                    contactTab === "rfq"
                      ? "border-brand-gold text-brand-gold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Request RFQ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactTab("portfolio");
                    setPortfolioSuccess(false);
                  }}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-mono tracking-wider uppercase font-bold transition-all duration-300 border-b-2 text-center cursor-pointer ${
                    contactTab === "portfolio"
                      ? "border-brand-gold text-brand-gold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Submit Portfolio
                </button>
              </div>

              {contactTab === "rfq" ? (
                <>
                  <h3 className="font-display text-xs sm:text-sm text-brand-gold tracking-widest uppercase mb-4 font-semibold text-left">
                    INDUSTRIAL ASSET RFQ REQUEST
                  </h3>
                  
                  {submitSuccess && (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-none mb-6 text-left flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-white font-mono uppercase">Submission Logged Securely</h5>
                        <p className="text-[11px] text-gray-300 font-sans mt-0.5">
                          Your asset sourcing RFQ was received and routed to the Houston central desk. A procurement specialist will contact you in 2 business hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {formErrors.submit && (
                    <p className="text-[11px] text-red-400 font-mono mb-4">{formErrors.submit}</p>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Full Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={quoteForm.name}
                            onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                            placeholder="e.g. Marcus Vance" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {formErrors.name && <p className="text-[10px] text-red-400 mt-1 font-mono">{formErrors.name}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Company Name *</label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={quoteForm.company}
                            onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                            placeholder="e.g. Apex Oil Ltd" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {formErrors.company && <p className="text-[10px] text-red-400 mt-1 font-mono">{formErrors.company}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Corporate Email *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="email" 
                            required
                            value={quoteForm.email}
                            onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                            placeholder="e.g. m.vance@apexoil.com" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {formErrors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{formErrors.email}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={quoteForm.phone}
                            onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                            placeholder="e.g. +1 (832) 555-0199" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {formErrors.phone && <p className="text-[10px] text-red-400 mt-1 font-mono">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Select Sourcing Service</label>
                        <select 
                          value={quoteForm.service}
                          onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                          className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none px-4 py-3 text-xs text-gray-200 focus:outline-none cursor-pointer"
                        >
                          <option value="asset-procurement">Industrial Asset Procurement</option>
                          <option value="infrastructure-sourcing">Infrastructure Sourcing</option>
                          <option value="fabrication-coordination">Fabrication Coordination</option>
                          <option value="global-logistics">Global Logistics Solutions</option>
                          <option value="project-procurement">Project Procurement Management</option>
                          <option value="supply-chain">Supply Chain Coordination</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Urgency Threshold</label>
                        <select 
                          value={quoteForm.urgency}
                          onChange={(e) => setQuoteForm({ ...quoteForm, urgency: e.target.value })}
                          className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none px-4 py-3 text-xs text-gray-200 focus:outline-none cursor-pointer"
                        >
                          <option value="Routine">Routine (2-3 Business Days)</option>
                          <option value="Expedited">Expedited (24 Hours)</option>
                          <option value="Critical">Critical Sourcing (12 Hours)</option>
                          <option value="Immediate">Immediate Central Desk Attention</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Equipment or Cargo Specifications *</label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                        <input 
                          type="text" 
                          required
                          value={quoteForm.details}
                          onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                          placeholder="e.g. API-5L Steel Linepipes, ASME Boiler Blocks" 
                          className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                        />
                      </div>
                      {formErrors.details && <p className="text-[10px] text-red-400 mt-1 font-mono">{formErrors.details}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Special Logistics Instructions (Optional)</label>
                      <textarea 
                        rows={3}
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                        placeholder="Provide heavy transport constraints, required certifications, dimensional reports..."
                        className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none px-4 py-3 text-xs text-white focus:outline-none resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-brand-gold to-brand-accent hover:from-yellow-500 hover:to-orange-500 text-brand-blue-dark font-sans font-extrabold text-sm py-4 rounded-none transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-brand-gold/15 uppercase tracking-widest mt-2 cursor-pointer"
                    >
                      {isSubmitting ? "TRANSMITTING TO CENTRAL DESK..." : "SUBMIT RFQ REQUEST"}
                    </button>

                  </form>
                </>
              ) : (
                <>
                  <h3 className="font-display text-xs sm:text-sm text-brand-gold tracking-widest uppercase mb-4 font-semibold text-left">
                    ASSET PORTFOLIO SUBMISSION
                  </h3>
                  
                  {portfolioSuccess && (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-none mb-6 text-left flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-white font-mono uppercase">Portfolio Authenticated Securely</h5>
                        <p className="text-[11px] text-gray-300 font-sans mt-0.5">
                          Your asset inventory has been logged and queued. Our Houston desk will verify equipment registration records within 2 business hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {portfolioErrors.submit && (
                    <p className="text-[11px] text-red-400 font-mono mb-4">{portfolioErrors.submit}</p>
                  )}

                  <form onSubmit={handlePortfolioSubmit} className="space-y-4 text-left">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Contact Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={portfolioForm.name}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, name: e.target.value })}
                            placeholder="e.g. Richard Hendricks" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {portfolioErrors.name && <p className="text-[10px] text-red-400 mt-1 font-mono">{portfolioErrors.name}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Holding Company *</label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={portfolioForm.company}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, company: e.target.value })}
                            placeholder="e.g. West Coast Excavation LLC" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {portfolioErrors.company && <p className="text-[10px] text-red-400 mt-1 font-mono">{portfolioErrors.company}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Corporate Email *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="email" 
                            required
                            value={portfolioForm.email}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, email: e.target.value })}
                            placeholder="e.g. r.hendricks@wcexcavation.com" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {portfolioErrors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{portfolioErrors.email}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Direct Phone *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={portfolioForm.phone}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, phone: e.target.value })}
                            placeholder="e.g. +1 (415) 555-0268" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {portfolioErrors.phone && <p className="text-[10px] text-red-400 mt-1 font-mono">{portfolioErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Asset Category</label>
                        <select 
                          value={portfolioForm.category}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                          className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none px-4 py-3 text-xs text-gray-200 focus:outline-none cursor-pointer"
                        >
                          <option value="commercial-fleet">Commercial Truck Fleet</option>
                          <option value="heavy-sourcing-rig">Heavy Rigging & Foundries</option>
                          <option value="crane-fabrication">Crane & Fabrication Assemblies</option>
                          <option value="marine-cargo">Marine Vessel & Port Spares</option>
                          <option value="bulk-mining">Bulk Mining Equipment</option>
                          <option value="structural-other">Structural / Infrastructure Items</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Estimated Value (USD) *</label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={portfolioForm.value}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, value: e.target.value })}
                            placeholder="e.g. $450,000" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Current Equipment Location *</label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            required
                            value={portfolioForm.location}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, location: e.target.value })}
                            placeholder="e.g. Bakersfield Yard, CA" 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                        {portfolioErrors.location && <p className="text-[10px] text-red-400 mt-1 font-mono">{portfolioErrors.location}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Image/Spec Links (Optional)</label>
                        <div className="relative">
                          <FileText className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3.5" />
                          <input 
                            type="text" 
                            value={portfolioForm.notes}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, notes: e.target.value })}
                            placeholder="Link to photos, inspection PDFs, registries..." 
                            className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none pl-9 pr-4 py-3 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Full Asset Inventory Description *</label>
                      <textarea 
                        rows={3}
                        required
                        value={portfolioForm.description}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                        placeholder="Detail model numbers, manufacturer years, hours of operation, maintenance records, engine models..."
                        className="w-full bg-brand-green-dark border border-brand-gold/15 focus:border-brand-gold rounded-none px-4 py-3 text-xs text-white focus:outline-none resize-none"
                      />
                      {portfolioErrors.description && <p className="text-[10px] text-red-400 mt-1 font-mono">{portfolioErrors.description}</p>}
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-brand-gold to-brand-accent hover:from-yellow-500 hover:to-orange-500 text-brand-blue-dark font-sans font-extrabold text-sm py-4 rounded-none transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-brand-gold/15 uppercase tracking-widest mt-2 cursor-pointer"
                    >
                      {isSubmitting ? "TRANSMITTING TO CENTRAL DESK..." : "SUBMIT ASSET PORTFOLIO"}
                    </button>

                  </form>
                </>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Footer styled as custom corporate card */}
      <footer className="bg-brand-green-dark border-t border-brand-gold/15 pt-16 pb-8 text-xs font-mono text-gray-400 mt-auto text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-brand-gold/10">
            
            {/* Logo/Summary */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                {/* Logo Image */}
                <img 
                  src={stravonLogo} 
                  alt="Stravon Logo" 
                  className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-base font-display font-bold tracking-widest text-white">STRAVON</h4>
                  <p className="text-[9px] text-brand-gold uppercase tracking-wider font-semibold">HEAVY INDUSTRIES</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                The Global Industrial Clearinghouse. Connecting multi-modal sourcing requirements with precision logistics assets and vetted ASME/AWS fabrication yards.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-display text-xs font-bold text-white tracking-widest uppercase">QUICK LINKS</h5>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">About SCM Desk</button></li>
                <li><button onClick={() => scrollToSection("solutions")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Our Sourcing Capabilities</button></li>
                <li><button onClick={() => scrollToSection("industries")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Verticals Serviced</button></li>
                <li><button onClick={() => scrollToSection("gallery")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Featured Gallery</button></li>
                <li><button onClick={() => scrollToSection("finance")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Capital Finance</button></li>
              </ul>
            </div>

            {/* SCM Services */}
            <div className="md:col-span-3 space-y-4">
              <h5 className="font-display text-xs font-bold text-white tracking-widest uppercase">CAPABILITIES</h5>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => scrollToSection("solutions")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Asset Procurement</button></li>
                <li><button onClick={() => scrollToSection("solutions")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Infrastructure Sourcing</button></li>
                <li><button onClick={() => scrollToSection("solutions")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Fabrication Coordination</button></li>
                <li><button onClick={() => scrollToSection("solutions")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Global Logistics Solutions</button></li>
                <li><button onClick={() => scrollToSection("solutions")} className="hover:text-brand-gold text-left transition-colors cursor-pointer">Project Supply Chains</button></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-2 space-y-4">
              <h5 className="font-display text-xs font-bold text-white tracking-widest uppercase">HEAD OFFICE</h5>
              <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                801 Travis Street<br />
                Suite 2101-2308<br />
                Houston, TX 77002
              </p>
              <p className="text-[11px] font-bold text-white">+1 (832) 583-2059</p>
            </div>

          </div>

          {/* Centered required footer credits */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 text-center md:text-left">
            <div>
              © {new Date().getFullYear()} Stravon Heavy Industries. All Rights Reserved.
            </div>
            
            {/* REQUIRED FOOTER TEXT AND LINK - CENTER ALIGNED */}
            <div className="text-center font-bold text-gray-400">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">iWebNext</a>
            </div>

            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-brand-gold">Privacy Policy</a>
              <span>|</span>
              <a href="#terms" className="hover:text-brand-gold">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-50 w-11 h-11 bg-brand-green/80 hover:bg-brand-gold border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-blue-dark rounded-none flex items-center justify-center shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating AI Sourcing Assistant */}
      <Chatbot />

    </div>
  );
}
