import { X } from "lucide-react";

export default function InfoModal({
  isOpen,
  message,
  onConfirm,
  onClose,   // 🔥 new prop
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose} // 🔥 tap outside closes
    >

      {/* MODAL BOX */}
      <div
        className="bg-white p-6 rounded-xl w-80 text-center space-y-4 relative"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >

        {/* CLOSE ICON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
          style={{ background: "none", border: "none" }}
        >
          <X size={18} />
        </button> <br />

        {/* MESSAGE */}
        <div className="text-emerald-700 font-semibold">
          {message}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white py-1 rounded"
         
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-emerald-600 text-white py-1 rounded"
           
          >
            Proceed
          </button>

        </div>

      </div>
    </div>
  );
}
