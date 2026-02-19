import { useState } from "react";
import Header from "../components/layout/Header";
import PipelineTabs from "../components/layout/PipelineTabs";
import LeadsPage from "../features/leads/LeadsPage";
import FloatingButton from "../components/layout/FloatingButton";
import AddLeadModal from "../features/leads/AddLeadModal";
import SideMenu from "../components/layout/SideMenu";
import CatalogueManager from "../features/catalogue/CatalogueManager";
import LeadDetails from "../features/leads/LeadDetails";
import BillsPage from "../features/billing/BillsPage";
import ArchivedLeadsPage from "../features/leads/ArchivedLeadsPage";

export default function MainApp() {
  const [stage, setStage] = useState("LEAD");
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [screen, setScreen] = useState("LEADS");
  const [openLead, setOpenLead] = useState(null);


  const handleTabChange = (newStage) => {
    setShowModal(false);
    setMenuOpen(false);
    setScreen("LEADS");

    setOpenLead(null);

    setStage(newStage);
  };


  return (
    <div className="min-h-screen bg-white text-white flex flex-col  shadow-lg relative">
      <Header onOpenMenu={() => setMenuOpen(true)} />



      <LeadsPage
        stage={stage}
        refresh={refresh}
        setRefresh={setRefresh}
        onOpenLead={setOpenLead}
      />

      {openLead && (
        <LeadDetails
          lead={openLead}
          onBack={() => setOpenLead(null)}
        />
      )}


      <FloatingButton onClick={() => setShowModal(true)} />
      <PipelineTabs
        stage={stage}
        onChangeStage={handleTabChange}
      />


      <AddLeadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => setRefresh(!refresh)}
      />
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(s) => {
          setScreen(s);
          setMenuOpen(false);
        }}
      />


      {screen === "CATALOGUE" && <CatalogueManager />}
      {screen === "BILLS" && <BillsPage />}
      {screen === "ARCHIVED" && <ArchivedLeadsPage />}


    </div>
  );
}
