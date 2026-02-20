import { useEffect } from "react";

export default function Toast({ message, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(onClose, 3000); // ⏱ 3 seconds
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
}
