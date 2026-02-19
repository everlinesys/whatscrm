import { useState } from "react";
import api from "../../services/api";

export default function CreateBillModal({
  lead,
  isOpen,
  onClose,
  onCreated,
}) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    const businessId = localStorage.getItem("businessId");

    const res = await api.post("/bills", {
      leadId: lead.id,
      amount: Number(amount),
      businessId,
      businessName: localStorage.getItem("businessName"),
    });

    onCreated(res.data);
    onClose();
  };

  return (
    <div className="fixed bottom-17 inset-0 bg-black/60 flex items-end z-40">

      <div className="bg-white text-black w-full p-4 rounded-t-2xl space-y-3">

        <h2 className="font-bold text-lg text-emerald-900">
          Create Bill
        </h2>

        <div className="text-sm text-gray-600">
          {lead.name} — {lead.service}
        </div>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded"
        />

        <button
          onClick={handleCreate}
          className="w-full bg-emerald-600 text-white py-2 rounded"
        >
          Generate Bill
        </button>

        <button
          onClick={onClose}
          className="w-full text-emerald-600"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
