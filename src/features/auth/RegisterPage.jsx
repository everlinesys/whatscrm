import { useState } from "react";
import api from "../../services/api";
import AuthLayout from "./AuthLayout";

export default function RegisterPage({ onRegister, goToLogin }) {
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await api.post("/auth/register", {
      businessName,
      name,
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    onRegister(); // 🔥 open app
  };

  return (
    <AuthLayout title="Register Business">

      <div className="space-y-4">

        <input
          placeholder="Business Name"
          className="w-full p-3 rounded bg-emerald-800 outline-none"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        <input
          placeholder="Your Name"
          className="w-full p-3 rounded bg-emerald-800 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-emerald-600 py-3 rounded font-semibold"
        >
          Create Business
        </button>

        <div className="text-center text-sm">
          Already registered?{" "}
          <button
            onClick={goToLogin}
            className="text-emerald-300"
          >
            Login
          </button>
        </div>

      </div>

    </AuthLayout>
  );
}
