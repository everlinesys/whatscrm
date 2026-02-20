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
import InfoModal from "../components/common/InfoModal";
import ProfilePage from "../features/profile/ProfilePage";
import PresetsComingSoon from "../features/message-presets/PresetsComing";

export default function MainApp() {
  const [stage, setStage] = useState("LEAD");
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [screen, setScreen] = useState("LEADS");
  const [openLead, setOpenLead] = useState(null);

  // ⭐ LOGOUT CONFIRM
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // 🟢 TAB CHANGE
  const handleTabChange = (newStage) => {
    setShowModal(false);
    setMenuOpen(false);
    setScreen("LEADS");
    setOpenLead(null);
    setStage(newStage);
  };

  // 🧭 MENU NAVIGATION
  const handleNavigate = (target) => {
    if (target === "LOGOUT") {
      setShowLogoutConfirm(true);
      return;
    }

    setScreen(target);
    setMenuOpen(false);
    setOpenLead(null);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col shadow-lg relative">

      <Header
        onOpenMenu={() => setMenuOpen(true)}
        onOpenProfile={() => {
          setScreen("PROFILE");
          setOpenLead(null);
        }}
      />


      {/* 🟢 MAIN SCREENS */}
      {screen === "LEADS" && (
        <>
          <LeadsPage
            stage={stage}
            refresh={refresh}
            setRefresh={setRefresh}
            onOpenLead={setOpenLead}
          />

          <FloatingButton onClick={() => setShowModal(true)} />

          <PipelineTabs
            stage={stage}
            onChangeStage={handleTabChange}
          />
        </>
      )}

      {screen === "CATALOGUE" && <CatalogueManager onBack={() => setScreen("LEADS")} />}
      {screen === "BILLS" && <BillsPage onBack={() => setScreen("LEADS")} />}
      {screen === "ARCHIVED" && <ArchivedLeadsPage onBack={() => setScreen("LEADS")} />}
      {screen === "PROFILE" && <ProfilePage onBack={() => setScreen("LEADS")} />}
      {screen === "PRESETS" && <PresetsComingSoon onBack={() => setScreen("LEADS")} />}

      {/* 🟢 LEAD DETAILS OVERLAY */}
      {openLead && (
        <LeadDetails
          lead={openLead}
          onBack={() => setOpenLead(null)}
          onStageChanged={() => setRefresh(prev => !prev)}
        />
      )}



      {/* 🟢 ADD LEAD MODAL */}
      <AddLeadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => setRefresh(!refresh)}
      />

      {/* 🟢 SIDE MENU */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 🟢 LOGOUT CONFIRM */}
      <InfoModal
        isOpen={showLogoutConfirm}
        message="Log out of WassupLeads on this device?"
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />

    </div>
  );
}
