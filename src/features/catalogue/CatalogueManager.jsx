import { useEffect, useState } from "react";
import api from "../../services/api";
import AddCatalogueModal from "./AddCatalogueModal";
import { Plus, Trash2 } from "lucide-react";

export default function CatalogueManager() {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const businessId = localStorage.getItem("businessId");

    const loadItems = async () => {
        const res = await api.get(`/catalogue/${businessId}`);
        setItems(res.data);
    };

    useEffect(() => {
        loadItems();
    }, []);

    return (
        <div className="fixed inset-0 bg-emerald-50 text-emerald-900 flex flex-col">

            {/* HEADER */}
            <div className="bg-white px-4 py-3 shadow font-bold">
                Catalogue
            </div>

            {/* LIST */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                    >
                        {/* LEFT INFO */}
                        <div>
                            <div className="font-semibold">{item.name}</div>

                            <div className="text-sm opacity-70">
                                ₹{item.price || "-"} · {item.durationMin || "-"} min
                            </div>
                        </div>

                        {/* RIGHT ACTIONS */}
                        <div className="flex items-center gap-3">

                            <div className="text-xs text-emerald-600">
                                {item.active ? "Active" : "Inactive"}
                            </div>

                            {/* DELETE BUTTON */}
                            <button
                                onClick={async () => {
                                    await api.delete(`/catalogue/${item.id}`);
                                    loadItems();
                                }}
                                className="text-red-500 active:scale-90"
                                style={{ background: "none", border: "none" }}
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>
                    </div>
                ))}


            </div>

            {/* FLOATING ADD BUTTON */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-35 right-5 bg-emerald-600 text-white p-4 rounded-full shadow-lg active:scale-95"
            >
                <Plus size={24} />
            </button>

            {/* ADD MODAL */}
            <AddCatalogueModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreated={loadItems}
            />

        </div>
    );
}
