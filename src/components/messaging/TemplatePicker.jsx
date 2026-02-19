import { templatesByStage } from "../../utils/messageTemplates";

export default function TemplatePicker({ lead, onSend }) {
  const templates = templatesByStage[lead.stage] || [];

  return (
    <div className="space-y-2">
      {templates.map((tpl, i) => {
        const message = tpl
          .replace("{name}", lead.name)
          .replace("{service}", lead.service || "");

        return (
          <button
            key={i}
            onClick={() => onSend(message)}
            className="w-full bg-emerald-700 p-2 rounded text-left"
          >
            {message}
          </button>
        );
      })}
    </div>
  );
}
