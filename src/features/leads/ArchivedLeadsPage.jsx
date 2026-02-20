import { useEffect, useState } from "react";
import api from "../../services/api";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function ArchivedLeadsPage({ onBack }) {
  const [leads, setLeads] = useState([]);

  const businessId = localStorage.getItem("businessId");

  const loadLeads = async () => {
    const res = await api.get(`/leads/archived/${businessId}`);
    setLeads(res.data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div className="fixed inset-0 bg-emerald-50 text-emerald-900 flex flex-col">

      {/* HEADER */}


      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} style={{ background: "none" }}>
          <ArrowLeft />
        </button>
        <div className="font-semibold"> Catalogue
        </div>
      </div>


      {/* LIST */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

        {leads.length === 0 && (
          <div className="text-center opacity-60 mt-10">
            No archived leads
          </div>
        )}

        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            {/* LEFT INFO */}
            <div>
              <div className="font-semibold">{lead.name}</div>

              <div className="text-sm opacity-70">
                {lead.service}
              </div>

              <div className="text-xs opacity-50">
                {lead.phone}
              </div>
            </div>

            {/* RESTORE BUTTON */}
            <button
              onClick={async () => {
                await api.patch(`/leads/${lead.id}/restore`);
                loadLeads();
              }}
              className="text-emerald-600"
              style={{ background: "none", border: "none" }}
            >
              <RotateCcw size={18} />
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}
