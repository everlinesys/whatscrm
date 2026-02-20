import { useEffect, useState } from "react";
import ActivityBubble from "../../components/messaging/ActivityBubble";
import TemplatePicker from "../../components/messaging/TemplatePicker";
import api from "../../services/api";
import { getNextStage } from "../../utils/stageFlow";
import { getWhatsAppLink } from "../../utils/whatsAppLink";
import { CheckCircle, MessageCircle, Settings2, Send, FileText } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import CataloguePicker from "../../components/messaging/CataloguePicker";
import CreateBillModal from "../../features/billing/CreateBillModal";
import InfoModal from "../../components/common/InfoModal";
import { downloadFile } from "../../utils/downloadFile";

export default function LeadDetails({ lead, onBack, onStageChanged }) {
    const [activities, setActivities] = useState([]);
    const [showTemplates, setShowTemplates] = useState(false);
    const [customMessage, setCustomMessage] = useState("");
    const [showCustom, setShowCustom] = useState(false);
    const [showCatalogue, setShowCatalogue] = useState(false);
    // const [isNewLead, setIsNewLead] = useState(false);
    const [showBill, setShowBill] = useState(false);
    const [showBillInfo, setShowBillInfo] = useState(false);

    const stageMessages = {
        BOOKED: (lead) =>
            `Your booking is confirmed for ${lead.service}. See you soon 🙂`,

        ACTIVE: (lead) =>
            `Your session for ${lead.service} is now in progress.`,

        DONE: (lead) =>
            `Thank you for visiting us! Hope you loved the ${lead.service}.`,

        FOLLOW_UP: (lead) =>
            `It’s time for your next ${lead.service}. Want to book again?`,
    };

    // 🔄 Load activities
    useEffect(() => {
        api.get(`/leads/${lead.id}/activities`).then((res) => {
            setActivities(res.data);
            // setIsNewLead(res.data.length <= 1);

        });

    }, [lead.id]);

    const refreshActivities = async () => {
        const res = await api.get(`/leads/${lead.id}/activities`);
        setActivities(res.data);
    };

    const handleSendBill = async () => {
        const res = await api.get(`/bills/lead/${lead.id}`);

        const existingBill = res.data;

        if (existingBill) {
            // 🟢 BILL EXISTS → DOWNLOAD
            sendBill(existingBill);
        } else {
            // 🔴 NO BILL → ASK AMOUNT
            setShowBill(true); // open CreateBillModal
        }
    };


    const sendBill = async (bill) => {
        const billUrl = bill.fileUrl;
        const baseUrl = import.meta.env.VITE_API_URL_STATIC;

        // window.open(`${baseUrl}${billUrl}`, "_blank");
        // 🔽 DOWNLOAD BILL
        await downloadFile(
            `${baseUrl}${bill.fileUrl}`,
            `Invoice_${lead.name}.pdf`
        );

        // 🧠 SHOW INSTRUCTION MODAL
        setShowBillInfo(true);
    };


    return (
        <div className="fixed inset-0 bg-emerald-50 text-white flex flex-col z-31">

            {/* 🟢 HEADER */}

            <div className="bg-[#075E54] px-2  py-2 flex items-center text-white">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-3 flex-1"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "left",
                        gap: "6px",

                    }}>

                    <a
                        onClick={onBack}
                        className=" active:scale-95"
                        style={{ background: "none", border: "none", color: "white", display: "flex", alignItems: "center", gap: "4px", padding: 0, margin: 0 }}
                    >
                        <ArrowLeft size={22} />
                    </a>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-semibold">
                        {lead.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name + Subtitle */}
                    <div className="leading-tight">
                        <div className="font-semibold">{lead.name}</div>
                        <div className="text-xs opacity-80">
                            {lead.service}
                        </div>
                    </div>

                </div>

                {/* RIGHT ICON ACTION */}
                <button
                    onClick={async () => {
                        const nextStage = getNextStage(lead.stage);

                        await api.patch(`/leads/${lead.id}/stage`, {
                            stage: nextStage,
                        });

                        // 🧠 AUTO MESSAGE
                        const template = stageMessages[nextStage];

                        if (template) {
                            const message = template(lead);

                            // Log activity
                            await api.post("/activity/message", {
                                leadId: lead.id,
                                message,
                            });

                            // Open WhatsApp
                            const link = getWhatsAppLink(lead.phone, message);
                            window.open(link, "_blank");
                        }

                        await refreshActivities();
                        onStageChanged();
                        onBack();


                    }}
                    className="p-1 active:scale-95 text-right"
                    style={{ background: "none", border: "none", outline: "none", display: "flex", flexDirection: "column", alignItems: "flex-end" }}
                >
                    <CheckCircle size={22} />
                    <p className="text-xs mt-1" style={{ fontSize: 12 }}>mark {getNextStage(lead.stage).toLowerCase()}</p>
                </button>

            </div>



            {/* 🟢 MARK NEXT STAGE — UNDER HEADER */}


            {/* 🟢 CHAT AREA */}
            <div className="flex-1 p-4 space-y-3 pb-12 overflow-y-auto">
                {activities.map((a) => (
                    <ActivityBubble key={a.id} activity={a} />
                ))}
            </div>


            {/* 🟢 BOTTOM MESSAGE BUTTON — CENTER */}
            <div className="bg-white border-t p-3 flex justify-center">
                {lead.stage === "DONE" || lead.stage === "FOLLOW_UP" && <button
                    onClick={handleSendBill}


                    className="fixed bottom-46 right-5  p-4 rounded-full shadow-lg active:scale-95"
                    style={{ background: "white", color: "green" }}
                >
                    <FileText size={22} />
                    {/* <p className="text-xs mt-1" style={{ fontSize: 12 }}>send Bill</p> */}
                </button>}

                <button
                    onClick={() => setShowCatalogue(true)}
                    className="fixed bottom-31 right-5  p-4 rounded-full shadow-lg active:scale-95"
                    style={{ background: "white", color: "green" }}  >
                    <Settings2 size={22} />
                    {/* <p className="text-xs mt-1" style={{ fontSize: 8 }}>catalogue</p> */}
                </button>
                <button
                    onClick={() => setShowTemplates(true)}
                    className="fixed bottom-16 right-5  p-4 rounded-full shadow-lg active:scale-95"
                    style={{ background: "white", color: "green" }}
                >
                    <MessageCircle size={22} />
                </button>
            </div>

            {/* 🟩 TEMPLATE PICKER */}
            {showTemplates && (
                <div className="fixed bottom-10 inset-0 bg-black/60 flex items-end z-35 ">
                    <div className="bg-emerald-900 w-full p-4 rounded-t-2xl text-white">
                        <h2 className="font-bold mb-2">
                            Choose Message
                        </h2>
                        {/* ✏️ CUSTOM MESSAGE BUTTON */}
                        <button
                            onClick={() => setShowCustom(true)}
                            className="w-full bg-emerald-700 p-3 rounded mb-3 text-left"
                        >
                            ✏️ Custom Message
                        </button>


                        <TemplatePicker
                            lead={lead}
                            onSend={async (message) => {
                                await api.post("/activity/message", {
                                    leadId: lead.id,
                                    message,
                                });

                                const link = getWhatsAppLink(
                                    lead.phone,
                                    message
                                );

                                window.open(link, "_blank");

                                await refreshActivities();

                                setShowTemplates(false);
                            }}
                        />

                        <button
                            onClick={() => setShowTemplates(false)}
                            className="mt-3 w-full text-emerald-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {/* 🟢 CUSTOM MESSAGE INPUT */}
            {showCustom && (
                <div className="mt-3 space-y-2 fixed bottom-10 w-full z-99">
                    <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full p-2 rounded bg-emerald-800 outline-none"
                        rows={3}
                    />

                    <button
                        onClick={async () => {
                            if (!customMessage.trim()) return;

                            // Log activity
                            await api.post("/activity/message", {
                                leadId: lead.id,
                                message: customMessage,
                            });

                            // Open WhatsApp
                            const link = getWhatsAppLink(
                                lead.phone,
                                customMessage
                            );

                            window.open(link, "_blank");

                            await refreshActivities();

                            setCustomMessage("");
                            setShowCustom(false);
                            setShowTemplates(false);
                        }}
                        className="w-full bg-green-600 py-2 rounded"
                    >
                        Send <Send size={16} className="inline ml-2" />
                    </button>
                </div>
            )}

            {showCatalogue && (
                <div className="fixed bottom-16 inset-0 bg-black/60 flex items-end z-34">
                    <div className="bg-emerald-900 w-full p-4 rounded-t-2xl text-white">

                        <h2 className="font-bold mb-2">
                            Select Services
                        </h2>

                        <CataloguePicker
                            onSend={async (message) => {
                                // log activity
                                await api.post("/activity/message", {
                                    leadId: lead.id,
                                    message,
                                });

                                // open WhatsApp
                                const link = getWhatsAppLink(
                                    lead.phone,
                                    message
                                );

                                window.open(link, "_blank");

                                await refreshActivities();
                                setShowCatalogue(false);
                            }}
                            onClose={() => setShowCatalogue(false)}
                        />

                    </div>
                </div>
            )}
            {/* 🧠 AUTO SUGGEST */}
            {/* {lead.stage === "LEAD" && isNewLead && (
                <div className="bg-white fixed bottom-46 right-4 px-3 py-2 border-b flex gap-2 overflow-x-auto">

                    <button
                        onClick={sendFullCatalogue}
                        className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm whitespace-nowrap"
                        style={{ background: "white", color: "green" }}>
                        Send catalogue
                    </button>
                </div>
            )} */}
            {showBill && <CreateBillModal
                lead={lead}
                isOpen={showBill}
                onClose={() => setShowBill(false)}
                onCreated={(bill) => {
                    sendBill(bill);
                }}
            />}

            <InfoModal
                isOpen={showBillInfo}
                message="Bill downloaded. Please attach it before you send."
                onConfirm={() => {
                    const message =
                        "Here is your invoice. Please see attached bill.";

                    const link = getWhatsAppLink(lead.phone, message);

                    window.open(link, "_blank");
                    setShowBillInfo(false);
                }}
                onClose={() => setShowBillInfo(false)}
            />



        </div>
    );
}
