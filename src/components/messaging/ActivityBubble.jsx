export default function ActivityBubble({ activity }) {
  const isMessage = activity.type === "MESSAGE";

  return (
    <div className={`flex ${isMessage ? "justify-end" : "justify-start"} `}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isMessage
            ? "bg-emerald-600"
            : "bg-emerald-800"
        }`}
      >
        <div>{activity.content}</div>

        <div className="text-xs opacity-70 text-right">
          {new Date(activity.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
