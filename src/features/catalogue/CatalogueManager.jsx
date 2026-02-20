import { useEffect, useState } from "react";
import api from "../../services/api";
import AddCatalogueModal from "./AddCatalogueModal";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { FileText } from "lucide-react";

export default function CatalogueManager({ onBack }) {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);

    // 🟢 LOAD ITEMS (tenant-safe)
    const loadItems = async () => {
        const res = await api.get("/catalogue/my");
        setItems(res.data);
        setLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);

    return (
        <div className="fixed inset-0 bg-emerald-50 text-emerald-900 flex flex-col z-31">

            {/* HEADER */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                <button onClick={onBack} style={{ background: "none" }}>
                    <ArrowLeft />
                </button>
                <div className="font-semibold"> Catalogue
                </div>
            </div>
            {!loading && items.length === 0 && (
                <div className="flex flex-col items-center mt-16 opacity-70">
                    <FileText size={40} />
                    <div className="mt-3 font-semibold">
                        No items yet
                    </div>
                    <div className="text-sm">
                        Your catalogue items will appear here once created
                    </div>
                </div>
            )}

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

                            {/* DELETE */}
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
                className="fixed bottom-10 right-5 bg-emerald-600 text-white p-4 rounded-full shadow-lg active:scale-95"
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
