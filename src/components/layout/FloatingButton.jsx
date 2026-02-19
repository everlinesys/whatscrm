export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      // Added 'flex items-center justify-center' to keep the "+" perfectly centered
      className="z-30 fixed bottom-18 right-4 flex items-center justify-center w-14 h-14 rounded-full shadow-xl"
      style={{ 
        background: "white",
        opacity: 0.5, 
        color: "green", 
        fontSize: "30px", // or just 30
        fontWeight: "bold" 
      }}
    >
      +
    </button>
  );
}