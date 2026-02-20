import { useEffect, useState } from "react";
import api from "../../services/api";
import { ArrowLeft, Camera } from "lucide-react";
import Toast from "../../components/common/Toast";

export default function ProfilePage({ onBack }) {
    const [business, setBusiness] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [toast, setToast] = useState({
        show: false,
        message: "",
    });

    // 🟢 Load business info
    const loadBusiness = async () => {
        const res = await api.get("/business/me");
        setBusiness(res.data);
        setName(res.data.name);
    };

    useEffect(() => {
        loadBusiness();
    }, []);

    // 🟢 Save name
    const handleSave = async () => {
        setLoading(true);
        await api.put("/business/update", { name });
        await loadBusiness();
        setLoading(false);
        alert("Profile updated");
    };

    // 🟢 Upload logo
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 100 * 1024) {
            setToast({
                show: true,
                message: "Logo must be under 100 KB",
            });

            return;
        }

        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        setLoading(true);

        const formData = new FormData();
        formData.append("logo", file);

        const res = await api.post("/business/logo", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setBusiness(res.data);
        setLoading(false);
    };

    if (!business) return null;

    // 🔥 Important for VPS: ensure full URL
    const logoUrl = business.logoUrl
        ? `${import.meta.env.VITE_API_URL_STATIC}${business.logoUrl}`
        : null;
    const displayLogo = preview || logoUrl;

    return (
        <div className="fixed inset-0 bg-emerald-50 text-emerald-900 flex flex-col">

            {/* HEADER */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                <button onClick={onBack} style={{ background: "none" }}>
                    <ArrowLeft />
                </button>
                <div className="font-semibold">Business Profile</div>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-6">

                {/* 🟢 LOGO */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-28 h-28 rounded-full bg-emerald-200 flex items-center justify-center  relative">



                        {displayLogo ? (
                            <img
                                src={displayLogo}
                                className="w-full h-full object-cover rounded-full"
                                alt="logo"
                            />
                        ) : (
                            <span className="text-4xl font-bold">
                                {business.name?.charAt(0)}
                            </span>
                        )}


                        {/* Upload input */}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            id="logoUpload"
                            onChange={handleUpload}
                        />

                        <label
                            htmlFor="logoUpload"
                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
                        >
                            <Camera size={16} />
                        </label>
                    </div>

                    <div className="text-sm text-gray-500">
                        Logo / Watermark
                    </div>
                </div>

                {/* 🟢 BUSINESS NAME */}
                <div>
                    <label className="text-sm opacity-70">
                        Business Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white border outline-none"
                    />
                </div>

                {/* 🟢 EMAIL (LOCKED) */}
                <div>
                    <label className="text-sm opacity-70">
                        Email (cannot be changed)
                    </label>

                    <input
                        value={business.owner?.email || ""}
                        disabled
                        className="w-full p-3 rounded-lg bg-gray-200"
                    />
                </div>

                {/* SAVE */}
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl disabled:opacity-60"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

            </div>
            <Toast
                isOpen={toast.show}
                message={toast.message}
                onClose={() => setToast({ show: false, message: "" })}
            />

        </div>
    );
}
