import { useEffect, useState } from "react";
import api from "../../services/api";
import { Download, Send, FileText , ArrowLeft} from "lucide-react";
import { getWhatsAppLink } from "../../utils/whatsAppLink";

export default function BillsPage({ onBack }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBills = async () => {
    try {
      // 🏆 Backend gets businessId from token
      const res = await api.get("/bills/my");
      setBills(res.data);
    } catch (err) {
      console.error("Failed to load bills", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div className="fixed pb-17 z-30 inset-0 bg-emerald-50 text-emerald-900 flex flex-col">

      {/* HEADER */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} style={{ background: "none" }}>
          <ArrowLeft />
        </button>
        <div className="font-semibold">   Bills & Receipts
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

        {/* 🟢 LOADING */}
        {loading && (
          <div className="text-center opacity-70 mt-10">
            Loading bills...
          </div>
        )}

        {/* 🟡 EMPTY STATE */}
        {!loading && bills.length === 0 && (
          <div className="flex flex-col items-center mt-16 opacity-70">
            <FileText size={40} />
            <div className="mt-3 font-semibold">
              No bills yet
            </div>
            <div className="text-sm">
              Bills will appear here once created
            </div>
          </div>
        )}

        {/* 🟢 BILL LIST */}
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >

            {/* LEFT INFO */}
            <div>
              <div className="font-semibold">
                {bill.lead?.name || "Customer"}
              </div>

              <div className="text-sm opacity-70">
                ₹{bill.amount} ·{" "}
                {new Date(bill.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">

              {/* DOWNLOAD */}
              <button
                onClick={() => {
                  const baseUrl = import.meta.env.VITE_API_URL_STATIC;
                  window.open(`${baseUrl}${bill.fileUrl}`, "_blank");
                }}
                className="text-emerald-600 active:scale-95"
                style={{ background: "none", border: "none" }}
              >
                <Download size={18} />
              </button>

              {/* SEND AGAIN */}
              <button
                onClick={() => {
                  const message =
                    "Here is your invoice. Please see attached bill.";

                  const link = getWhatsAppLink(
                    bill.lead?.phone,
                    message
                  );

                  window.open(link, "_blank");
                }}
                className="text-green-600 active:scale-95"
                style={{ background: "none", border: "none" }}
              >
                <Send size={18} />
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
