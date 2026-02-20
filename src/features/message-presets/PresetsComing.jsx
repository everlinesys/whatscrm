import { ArrowLeft, FileText } from "lucide-react";

export default function PresetsComingSoon({ onBack }) {
  return (
    <div className="fixed inset-0 bg-emerald-50 text-emerald-900 flex flex-col z-40">

      {/* HEADER */}
      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} style={{ background: "none" }}>
          <ArrowLeft />
        </button>
        <div className="font-semibold">Message Presets</div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <div className="bg-emerald-100 p-6 rounded-full mb-4">
          <FileText size={48} className="text-emerald-700" />
        </div>

        <h2 className="text-xl font-bold mb-2">
          Feature Not Available Yet
        </h2>

        <p className="text-sm opacity-70 max-w-xs">
          Message Presets will allow you to save reusable replies
          for faster communication with customers.
        </p>

        <p className="text-xs mt-4 opacity-60">
          Coming in a future update 🚀
        </p>

      </div>

    </div>
  );
}
