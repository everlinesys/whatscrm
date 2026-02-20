import {
    UserPlus,
    CalendarCheck,
    Activity,
    CheckCircle,
    Repeat,
} from "lucide-react";

export default function PipelineTabs({ stage, onChangeStage }) {
    const tabs = [
        { label: "Leads", value: "LEAD", icon: UserPlus },
        { label: "Booked", value: "BOOKED", icon: CalendarCheck },
        { label: "Active", value: "ACTIVE", icon: Activity },
        { label: "Done", value: "DONE", icon: CheckCircle },
        { label: "Follow", value: "FOLLOW_UP", icon: Repeat },
    ];

    return (

        <div className=" w-full bg-white fixed bottom-0 left-0 right-0 flex py-0 z-35">

            {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = stage === tab.value;

                return (
                    <button
                        key={tab.value}
                        onClick={() => onChangeStage(tab.value)}
                        className="flex flex-col items-center text-xs z-10 px-0 outline-none focus:outline-none"
                        style={{ background: "none", flex: 1, padding: "0.5rem 0", outline: "none", borderRadius: 0, border: "none", color: active ? "#065f46" : "#374151" }}
                    >
                        <Icon
                            size={25}
                            className={
                                active
                                    ? "text-emerald-900"
                                    : "text-gray-700"
                            }
                        />

                        <span
                            className={

                                active
                                    ? "text-gray-900 text-xs"
                                    : "text-gray-700 text-xs"
                            }
                        >
                            {tab.label}
                        </span>
                    </button>
                );
            })}

        </div>
    );
}
