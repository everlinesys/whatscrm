import {  Settings, User2 } from "lucide-react";

export default function Header({ onOpenMenu, onOpenProfile }) {
    return (
        <div className="min-w-[100vw] fixed top-0 left-0 right-0 bg-white text-emerald-900 py-2 px-3 flex items-center justify-between"
        >

            {/* LEFT — App Name */}
            <h1 className="text-md font-semibold text-emerald-600" style={{ fontSize: 30 }}>
                WBusinessSuite
            </h1>

            {/* RIGHT — Actions */}
            <div className="flex items-center text-xl text-gray-700 font-black gap-4">

                <button onClick={onOpenProfile} style={{ background: "none", outline: "none", borderRadius: 0, border: "none" }}>
                    <User2 size={20} />
                </button> <button onClick={onOpenMenu} style={{ background: "none", outline: "none", borderRadius: 0, border: "none" }}>
                    <Settings size={20} />
                </button>
            </div>

        </div>
    );
}
