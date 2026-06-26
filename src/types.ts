export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  items: string[];
}

export interface IndustryCard {
  id: string;
  title: string;
  iconName: string;
  description: string;
  subservices: string[];
}

export interface AdvantageItem {
  title: string;
  description: string;
  iconName: string;
}

export interface TradeFinanceItem {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "error";
  text: string;
  timestamp: Date;
}

// Client Portal - Supply Chain Tracker Types
export interface ShipmentOrder {
  id: string;
  trackingId: string;
  cargoType: string;
  origin: string;
  destination: string;
  status: "Fabrication" | "In Transit" | "Customs Clearance" | "Delivered";
  progress: number; // 0 to 100
  eta: string;
  carrier: string;
  vesselName: string;
  value: string;
  lat: number; // For map visualization
  lng: number;
  timeline: {
    stage: string;
    date: string;
    location: string;
    completed: boolean;
  }[];
}

export interface FabricationJob {
  id: string;
  component: string;
  quantity: string;
  partnerFacility: string;
  status: "Machining" | "Welding" | "QA Inspection" | "Packing" | "Dispatched";
  progress: number;
  qaOfficer: string;
  specifications: string;
}
