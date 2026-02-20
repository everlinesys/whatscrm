import { X, Package, FileText, Settings2, Archive, LogOut, User2 } from "lucide-react";


export default function SideMenu({ isOpen, onClose, onNavigate }) {
    if (!isOpen) return null;

    const menu = [
        { label: "Catalogue", icon: Package, screen: "CATALOGUE" },
        { label: "Message Presets", icon: FileText, screen: "PRESETS" },
        { label: "Bills & Receipts", icon: Settings2, screen: "BILLS" },
        { label: "Archived Leads", icon: Archive, screen: "ARCHIVED" },
        { label: "Profile", icon: User2, screen: "PROFILE" },
        { label: "Logout", icon: LogOut, screen: "LOGOUT" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex">

            {/* BACKDROP */}
            <div
                className="flex-1 bg-black/50"
                onClick={onClose}
            />

            {/* MENU PANEL */}
            <div className="w-72 bg-white text-emerald-900 h-full p-4 shadow-xl animate-slide-in-right">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">Menu</h2>

                    <button onClick={onClose} style={{ background: "none", color: "black" }}>
                        <X />
                    </button>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.label}
                                className="w-full flex items-center gap-3 p-3  hover:bg-emerald-100"
                                style={{ background: "none", color: "black", outline: "none", border: "none" }}
                                onClick={() => {
                                    if (item.screen === "LOGOUT") {
                                        onNavigate("LOGOUT"); // triggers modal in parent
                                    } else {
                                        onNavigate(item.screen);
                                    }
                                }}

                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
