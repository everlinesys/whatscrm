import { useState } from "react";
import api from "../../services/api";
import AuthLayout from "./AuthLayout";
import Toast from "../../components/common/Toast";

export default function LoginPage({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      onLogin();
    } catch (err) {

      setToast({
        show: true,
        message: err.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <AuthLayout title="Login">

      <div className="space-y-4">

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-emerald-800 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-emerald-800 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 py-3 rounded font-semibold"
        >
          Login
        </button>

        <div className="text-center text-sm">
          New business?{" "}
          <button
            onClick={goToRegister}
            className="text-emerald-300"
          >
            Register
          </button>
        </div>
        <Toast
          isOpen={toast.show}
          message={toast.message}
          onClose={() => setToast({ show: false, message: "" })}
        />
      </div>

    </AuthLayout>
  );
}
