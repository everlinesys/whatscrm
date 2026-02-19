import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CataloguePicker({ onSend, onClose }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  const businessId = localStorage.getItem("businessId");

  useEffect(() => {
    api.get(`/catalogue/${businessId}`).then((res) => {
      setItems(res.data);
    });
  }, []);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const sendCatalogue = () => {
    const chosen = items.filter((i) => selected.includes(i.id));

    const message =
      "Our Services:\n\n" +
      chosen
        .map(
          (i) =>
            `• ${i.name} — ₹${i.price} (${i.durationMin} min)`
        )
        .join("\n") +
      "\n\nReply to book 🙂";

    onSend(message);
  };

  return (
    <div className="space-y-3">

      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => toggle(item.id)}
          className={`w-full p-3 rounded text-left ${
            selected.includes(item.id)
              ? "bg-emerald-600"
              : "bg-emerald-800"
          }`}
        >
          {item.name} — ₹{item.price}
        </button>
      ))}

      <button
        onClick={sendCatalogue}
        className="w-full bg-green-600 py-2 rounded"
      >
        Send Selected
      </button>

      <button
        onClick={onClose}
        className="w-full text-emerald-300"
      >
        Cancel
      </button>
    </div>
  );
}
