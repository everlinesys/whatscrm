import { useState } from "react";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import MainApp from "./MainApp";

export default function App() {
  const [authMode, setAuthMode] = useState("login");

  const token = localStorage.getItem("token");

  if (!token) {
    return authMode === "login" ? (
      <LoginPage
        onLogin={() => window.location.reload()}
        goToRegister={() => setAuthMode("register")}
      />
    ) : (
      <RegisterPage
        onRegister={() => window.location.reload()}
        goToLogin={() => setAuthMode("login")}
      />
    );
  }

  return <MainApp />;
}
