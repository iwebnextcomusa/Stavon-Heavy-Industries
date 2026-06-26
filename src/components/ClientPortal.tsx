import React, { useState } from "react";
import { MOCK_SHIPMENTS, MOCK_FAB_JOBS } from "../data";
import { ShipmentOrder } from "../types";
import { 
  ShieldCheck, 
  MapPin, 
  Anchor, 
  Clock, 
  Layers, 
  CheckCircle, 
  Search, 
  AlertCircle,
  DollarSign,
  Key
} from "lucide-react";

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to logged in as guest
  const [accessKey, setAccessKey] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentOrder>(MOCK_SHIPMENTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey.trim().toLowerCase() === "stravon2026" || accessKey.trim() === "guest") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid clearance key. Please contact Stravon Central Central Central Desk for portal credentials.");
    }
  };

  const filteredShipments = MOCK_SHIPMENTS.filter(ship => 
    ship.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ship.cargoType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-none border border-brand-gold/20 overflow-hidden shadow-2xl relative geo-corner-brackets">
      {/* Portal Header */}
      <div className="bg-gradient-to-r from-brand-blue-light to-brand-blue px-6 py-4 border-b border-brand-gold/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
            <h3 className="font-display text-lg text-brand-gold tracking-wider font-semibold">
              STRAVON SECURE PORTAL
            </h3>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Encrypted Multi-Modal Sourcing & SCM Ledger
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-brand-gold/10 px-3 py-1.5 rounded-none border border-brand-gold/20 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span className="text-brand-gold">SECURE ACCESS GRANTED</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-red-950/40 px-3 py-1.5 rounded-none border border-red-900/30 text-xs font-mono text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>CLEARANCE REQUIRED</span>
            </div>
          )}
        </div>
      </div>

      {!isAuthenticated ? (
        /* Login State */
        <div className="p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-brand-gold/10 rounded-none border border-brand-gold/30 flex items-center justify-center mx-auto mb-6 relative geo-corner-brackets">
            <Key className="w-8 h-8 text-brand-gold" />
          </div>
          <h4 className="font-display text-xl text-white tracking-wide mb-2">Enter Secure Portal Key</h4>
          <p className="text-sm text-gray-400 mb-6">
            Clearance credentials are required to track multi-million dollar heavy industrial assets in transit.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type="password" 
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter Clearance Code (e.g. guest)" 
                className="w-full bg-brand-blue-dark/80 border border-brand-gold/30 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold font-mono tracking-widest text-center"
              />
            </div>
            {loginError && (
              <p className="text-xs text-red-400 font-mono mt-2">{loginError}</p>
            )}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-brand-gold to-yellow-600 hover:from-yellow-600 hover:to-brand-gold text-brand-blue-dark font-sans font-semibold text-sm py-3 rounded-none transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-brand-gold/15"
            >
              AUTHENTICATE CHANNEL
            </button>
            <p className="text-xs text-gray-500 font-mono">
              Hint: Enter <strong className="text-brand-gold">guest</strong> for mock demonstration access
            </p>
          </form>
        </div>
      ) : (
        /* Authenticated Tracking Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-gold/15 min-h-[550px]">
          
          {/* Sidebar - Active Bills of Lading / Shipments */}
          <div className="lg:col-span-4 p-5 bg-brand-blue-dark/30 flex flex-col gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-brand-gold/60 absolute left-3 top-3" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bills or Spares..." 
                className="w-full bg-brand-blue/50 border border-brand-gold/15 rounded-none pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[420px] pr-1">
              <div className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-semibold mb-1">
                Active Industrial Shipments ({filteredShipments.length})
              </div>
              
              {filteredShipments.map((ship) => (
                <button
                  key={ship.id}
                  onClick={() => setSelectedShipment(ship)}
                  className={`w-full text-left p-3.5 rounded-none border transition-all duration-200 flex flex-col gap-2 relative ${
                    selectedShipment.id === ship.id 
                      ? "bg-brand-gold/10 border-brand-gold/60 shadow-md shadow-brand-gold/5 geo-corner-brackets" 
                      : "bg-brand-blue/30 border-brand-gold/10 hover:border-brand-gold/20 hover:bg-brand-blue-light/40"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[11px] font-mono font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded-none">
                      {ship.trackingId}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-none ${
                      ship.status === "In Transit" ? "bg-blue-950 text-blue-400 border border-blue-900" :
                      ship.status === "Customs Clearance" ? "bg-amber-950 text-amber-400 border border-amber-900" :
                      ship.status === "Fabrication" ? "bg-purple-950 text-purple-400 border border-purple-900" :
                      "bg-emerald-950 text-emerald-400 border border-emerald-900"
                    }`}>
                      {ship.status}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white line-clamp-1">
                      {ship.cargoType}
                    </h5>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-gold/50" />
                      <span>{ship.destination}</span>
                    </p>
                  </div>
                  {/* Small progress meter */}
                  <div className="w-full mt-1.5">
                    <div className="flex justify-between text-[9px] text-gray-400 mb-0.5 font-mono">
                      <span>Progress</span>
                      <span>{ship.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-brand-blue-dark rounded-none overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-gold to-brand-accent transition-all duration-500" 
                        style={{ width: `${ship.progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main - Shipment Detail Dashboard */}
          <div className="lg:col-span-8 p-6 flex flex-col gap-6">
            
            {/* Asset Header Info */}
            <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-brand-gold/10 pb-5">
              <div>
                <span className="text-[10px] font-mono text-brand-gold font-semibold uppercase tracking-wider block mb-1">
                  BILL OF LADING SPECIFICATION
                </span>
                <h4 className="font-display text-lg text-white font-bold leading-tight">
                  {selectedShipment.cargoType}
                </h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Anchor className="w-3.5 h-3.5 text-brand-gold/60" />
                    Carrier: <strong className="text-gray-200">{selectedShipment.carrier}</strong>
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Layers className="w-3.5 h-3.5 text-brand-gold/60" />
                    Vessel: <strong className="text-brand-gold">{selectedShipment.vesselName}</strong>
                  </span>
                </div>
              </div>
              <div className="bg-brand-blue-light/50 border border-brand-gold/15 p-3 rounded-none flex items-center gap-3.5 md:self-center relative geo-corner-brackets">
                <div className="bg-brand-gold/10 p-2 rounded-none border border-brand-gold/15">
                  <DollarSign className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-mono">INSURED DECLARED VALUE</span>
                  <span className="text-sm font-bold text-white font-mono">{selectedShipment.value}</span>
                </div>
              </div>
            </div>

            {/* Shipment Milestones Timeline */}
            <div>
              <h5 className="text-xs font-mono text-brand-gold font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                Sourcing & Logistical Pipeline Milestones
              </h5>

              <div className="relative pl-6 border-l border-brand-gold/25 space-y-5 ml-2.5">
                {selectedShipment.timeline.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Square Node Icon */}
                    <span className={`absolute -left-[31px] top-1 w-5 h-5 rounded-none flex items-center justify-center border ${
                      step.completed 
                        ? "bg-brand-gold border-brand-gold text-brand-blue-dark" 
                        : "bg-brand-blue-dark border-brand-gold/35 text-brand-gold/50"
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-brand-gold/60 rounded-none" />
                      )}
                    </span>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
                      <div>
                        <h6 className={`text-xs font-semibold ${step.completed ? "text-white" : "text-gray-400"}`}>
                          {step.stage}
                        </h6>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 font-mono mt-0.5">
                          <MapPin className="w-3 h-3 text-brand-gold/40" />
                          <span>{step.location}</span>
                        </p>
                      </div>
                      <div className="text-[10px] font-mono text-brand-gold bg-brand-gold/5 px-2 py-0.5 rounded-none border border-brand-gold/10 self-start md:self-auto">
                        {step.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QA Fabrication Oversight Panel */}
            <div className="bg-brand-blue-light/30 border border-brand-gold/10 rounded-none p-4 mt-2 relative geo-corner-brackets">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <h5 className="text-xs font-mono text-brand-gold uppercase tracking-wider font-semibold">
                  AWS/ASME API Inspection Log (Fabrication Hub)
                </h5>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="text-gray-400 border-b border-brand-gold/15 font-mono text-[10px]">
                      <th className="pb-2">COMPONENT ASSEMBLY</th>
                      <th className="pb-2">PARTNER FACILITY</th>
                      <th className="pb-2">STAGE</th>
                      <th className="pb-2 text-right">OVERSIGHT OFFICER</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gold/10 text-gray-200">
                    {MOCK_FAB_JOBS.map((job) => (
                      <tr key={job.id}>
                        <td className="py-2.5 pr-2 font-medium">
                          {job.component}
                        </td>
                        <td className="py-2.5 text-xs text-gray-400">
                          {job.partnerFacility}
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded-none text-[9px] font-mono bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                            {job.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-right text-brand-gold font-mono text-[10px]">
                          {job.qaOfficer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-28 bg-brand-blue-dark border border-brand-gold/10 rounded-none overflow-hidden flex items-center justify-center geo-corner-brackets">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,36,56,0.5)_0%,rgba(3,10,16,1)_100%)] z-10" />
              {/* Fake abstract visual grid lines */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              
              <div className="relative z-20 text-center px-4">
                <p className="text-[10px] font-mono text-brand-gold tracking-widest flex items-center justify-center gap-1.5 uppercase">
                  <Anchor className="w-4.5 h-4.5 animate-bounce text-brand-accent" />
                  Satellite AIS Transponder Ping Active
                </p>
                <p className="text-xs text-gray-300 mt-1 font-mono">
                  Current Sector: <strong className="text-brand-gold">{selectedShipment.origin}</strong> to <strong className="text-white">{selectedShipment.destination}</strong>
                </p>
                <p className="text-[9px] text-gray-500 font-mono mt-1">
                  Estimated Coordinates: {selectedShipment.lat.toFixed(4)}° N, {selectedShipment.lng.toFixed(4)}° W
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Portal Footer */}
      <div className="bg-brand-blue-dark/50 border-t border-brand-gold/10 p-4 text-center">
        <p className="text-[10px] text-gray-500 font-mono">
          © {new Date().getFullYear()} Stravon Heavy Industries Clearinghouse. Automated pipeline transactions are verified under ISO-9001 and API Spec Q1 standards. Secure Socket Channel 256-Bit.
        </p>
      </div>
    </div>
  );
}
