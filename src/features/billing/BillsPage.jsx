import { useEffect, useState } from "react";
import api from "../../services/api";
import { Download, Send } from "lucide-react";
import { getWhatsAppLink } from "../../utils/whatsAppLink";

export default function BillsPage() {
  const [bills, setBills] = useState([]);

  const businessId = localStorage.getItem("businessId");

  const loadBills = async () => {
    const res = await api.get(`/bills/business/${businessId}`);
    setBills(res.data);
  };

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div className="fixed pb-17 inset-0 bg-emerald-50 text-emerald-900 flex flex-col">

      {/* HEADER */}
      <div className="bg-white px-4 py-3 shadow font-bold">
        Bills & Receipts
      </div>

      {/* LIST */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">

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
                  const baseUrl = import.meta.env.VITE_API_URL;
                  window.open(`${baseUrl}${bill.fileUrl}`, "_blank");
                }}
                className="text-emerald-600"
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
                className="text-green-600"
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
