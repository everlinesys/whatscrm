import { useState } from "react";
import api from "../../services/api";

export default function AddLeadModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const businessId = localStorage.getItem("businessId");

    const res = await api.post("/leads", {
      name,
      phone,
      service,
      businessId,
      businessName: localStorage.getItem("businessName"),
    });

    onCreated(res.data); // send back new lead
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end z-99">
      <div className="bg-emerald-900 w-full p-5 rounded-t-2xl space-y-4">

        <h2 className="text-lg font-bold">Add Lead</h2>

        <input
          placeholder="Customer name"
          className="w-full p-3 rounded bg-emerald-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="w-full p-3 rounded bg-emerald-800"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Service"
          className="w-full p-3 rounded bg-emerald-800"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 p-3 rounded font-bold"
        >
          Save Lead
        </button>

        <button
          onClick={onClose}
          className="w-full text-emerald-300"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
