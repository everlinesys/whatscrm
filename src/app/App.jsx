import { useState, useEffect } from "react";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import MainApp from "./MainApp";
import BackToHomeHandler from "../components/ui/BackToHomeHandler";

export default function App() {
  const [authMode, setAuthMode] = useState("login");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "The fortune is in the follow-up.",
      author: "Jim Rohn",
      sub: "80% of sales require 5 follow-up calls after the meeting."
    },
    {
      text: "Don't stop until you're proud.",
      author: "Anonymous",
      sub: "Consistent communication builds unbreakable trust."
    },
    {
      text: "Business is built on relationships.",
      author: "Modern Pro",
      sub: "A simple 'Thank You' message can increase retention by 2x."
    }
  ];

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="min-h-screen min-w-[100vw] flex">
        <BackToHomeHandler />

        {/* LEFT SIDE: AUTH FORM */}
        <div className="flex-1 flex items-center justify-center ">
          <div className="w-full ">
            {authMode === "login" ? (
              <LoginPage
                onLogin={() => window.location.reload()}
                goToRegister={() => setAuthMode("register")}
              />
            ) : (
              <RegisterPage
                onRegister={() => window.location.reload()}
                goToLogin={() => setAuthMode("login")}
              />
            )}
          </div>
        </div>

        {/* RIGHT SIDE: BUSINESS INSIGHT SLIDER (Visible on Desktop) */}
        <div className="hidden h-screen lg:flex flex-1 bg-[#042f2e] text-white items-center justify-center p-12 relative overflow-hidden">

          {/* Modern Ambient Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px]"></div>
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>

          <div className="relative z-10 max-w-lg w-full">
            {/* Animated Quote Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl transition-all duration-700 ease-in-out">

              {/* Icon with Soft Glow */}
              <div className="mb-10 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative p-5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Quote Text */}
              <div className="space-y-6 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight leading-tight min-h-[100px] transition-all duration-500">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                    "{quotes[quoteIndex].text}"
                  </span>
                </h2>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-6 bg-emerald-500/50"></div>
                  <p className="text-emerald-400 font-semibold tracking-wide uppercase text-xs">
                    {quotes[quoteIndex].author}
                  </p>
                  <div className="h-[1px] w-6 bg-emerald-500/50"></div>
                </div>

                <p className="text-slate-400 text-base leading-relaxed font-light italic px-4">
                  {quotes[quoteIndex].sub}
                </p>
              </div>

              {/* Modern Pill Navigation */}
              <div className="flex justify-center gap-3 mt-12">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setQuoteIndex(i)}
                    className={`transition-all duration-500 rounded-full ${i === quoteIndex
                        ? 'w-10 h-1.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Badge (Extra Flair) */}
            <div className="mt-8 text-center">
              <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-bold border border-white/10 px-3 py-1 rounded-full">
                Enterprise Ready Follow-up Systems
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <MainApp />;
}