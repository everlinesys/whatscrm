import { useState } from "react";
import api from "../../services/api";
import AuthLayout from "./AuthLayout";

export default function LoginPage({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    onLogin(); // 🔥 open app
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

      </div>

    </AuthLayout>
  );
}
