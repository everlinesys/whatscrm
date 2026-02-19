import { useState } from "react";
import api from "../../services/api";

export default function AddCatalogueModal({
  isOpen,
  onClose,
  onCreated,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  if (!isOpen) return null;

  const handleSave = async () => {
    const businessId = localStorage.getItem("businessId");

    await api.post("/catalogue", {
      businessId,
      name,
      price: Number(price),
      durationMin: Number(duration),
    });

    onCreated();
    onClose();
  };

  return (
    <div className="fixed bottom-10 inset-0 bg-black/60 flex items-end z-99">

      <div className="bg-white w-full p-4 rounded-t-2xl space-y-3">

        <h2 className="font-bold">Add Service</h2>

        <input
          placeholder="Service name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Duration (minutes)"
          className="w-full p-2 border rounded"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full bg-emerald-600 text-white py-2 rounded"
        >
          Save
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
