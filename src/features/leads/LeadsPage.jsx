import { useEffect, useState } from "react";
import { getNextStage } from "../../utils/stageFlow";
import api from "../../services/api";
import { getWhatsAppLink } from "../../utils/whatsAppLink";
import TemplatePicker from "../../components/messaging/TemplatePicker";
import LeadDetails from "./LeadDetails";
import { formatWhatsAppTime } from "../../components/ui/WhatsappFormatter";
import { Search } from "lucide-react";

export default function LeadsPage({ stage, refresh, onOpenLead }) {
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null); // template modal

    const [query, setQuery] = useState("");

    // 🔄 Fetch leads by stage
    useEffect(() => {
        api.get(`/leads/${stage}`).then((res) => setLeads(res.data));
    }, [stage, refresh]);
    const filteredLeads = leads.filter((lead) => {
        const q = query.toLowerCase();

        return (
            lead.name?.toLowerCase().includes(q) ||
            lead.service?.toLowerCase().includes(q) ||
            lead.lastActivity?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="flex-1 space-y-4 overflow-y-auto pb-24">
            {/* 🔍 SEARCH BAR */}

            <div className="bg-white text-gray-500 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">

                {/* Icon */}
                <span className="text-gray-400"><Search size={20} /></span>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search leads"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full outline-none text-sm"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="text-gray-400"
                        style={{ background: "none", outline: "none", border: "none", padding: 0 }}
                    >
                        ✕
                    </button>
                )}

            </div>



            {/* 🟢 LEAD LIST */}
            {
                filteredLeads.map((lead) => (
                    <div
                        key={lead.id}
                        onClick={() => onOpenLead(lead)}
                        className="px-4 py-3 bg-white text-black border-b border-gray-200 cursor-pointer"
                    >
                        <div className="flex justify-between items-start">

                            {/* LEFT SIDE */}
                            <div className="flex gap-3">

                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                                    {lead.name?.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    {/* Name */}
                                    <div className="font-semibold">
                                        {lead.name + " - " + lead.service}
                                    </div>

                                    {/* Last Activity */}
                                    <div className="text-sm text-gray-600 truncate max-w-[220px]">
                                        {(lead.lastActivity?.toLowerCase() || "No activity")}
                                    </div>


                                </div>
                            </div>

                            {/* RIGHT SIDE — TIME */}
                            <div className="text-xs text-gray-500 whitespace-nowrap">
                                {formatWhatsAppTime(lead.lastActivityTime)}
                            </div>

                        </div>
                    </div>
                ))
            }


            {/* 🟩 TEMPLATE PICKER MODAL */}
            {
                selectedLead && (
                    <div className="fixed inset-0 z-99 bg-black/60 flex items-end">
                        <div className="bg-emerald-900 w-full p-4 rounded-t-2xl">
                            <h2 className="font-bold mb-2">Choose Message</h2>

                            <TemplatePicker
                                lead={selectedLead}
                                onSend={async (message) => {
                                    // 1️⃣ Log activity
                                    await api.post("/activity/message", {
                                        leadId: selectedLead.id,
                                        message,
                                    });

                                    // 2️⃣ Open WhatsApp
                                    const link = getWhatsAppLink(
                                        selectedLead.phone,
                                        message
                                    );

                                    window.open(link, "_blank");
                                    setSelectedLead(null);
                                }}
                            />

                            <button
                                onClick={() => setSelectedLead(null)}
                                className="mt-3 w-full text-emerald-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }


        </div >
    );
}
