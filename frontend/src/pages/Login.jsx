import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Invalid credentials");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Success UI animation
      setSuccess(true);
      setLoading(false);

      // Redirect after animation → FIXED PATH
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 1200);
      
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="page-transition min-h-screen w-full flex items-center justify-center relative">

      {/* Background image */}
      <img
        src="/login-bg.png"
        className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
        alt="bg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/90"></div>

      {/* Success modal */}
      {success && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="confetti absolute w-2 h-2 rounded-sm"
              style={{
                background: ["#22c55e", "#a855f7", "#3b82f6"][i % 3],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}

          <div className="success-card bg-white rounded-2xl shadow-2xl px-12 py-10 text-center border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="success-icon w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg text-white text-4xl font-bold">
                ✓
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">Login Successful!</h2>
            <p className="text-gray-600 mt-1">Redirecting…</p>
          </div>
        </div>
      )}

      {/* Main login card */}
      <div
        className={`relative z-10 w-full max-w-5xl h-[630px] bg-white rounded-3xl shadow-xl overflow-hidden flex transition-all duration-700 ${
          success ? "blur-md scale-95" : ""
        }`}
      >
        {/* Left image section */}
        <div
          className="w-1/2 h-full relative overflow-hidden"
          style={{
            backgroundImage: "url('/login-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/80 to-purple-600/60"></div>

          {/* Decorative waves */}
          <svg className="absolute bottom-0 left-0 w-full animate-waveSlow opacity-80" viewBox="0 0 1440 320">
            <path
              fill="#A855F7"
              fillOpacity="0.35"
              d="M0,192L80,176C160,160,320,128,480,144C640,160,800,224,960,240C1120,256,1280,224,1360,208L1440,192V320H0Z"
            />
          </svg>

          <svg className="absolute bottom-0 left-0 w-full animate-waveFast opacity-50" viewBox="0 0 1440 320">
            <path
              fill="#9333EA"
              fillOpacity="0.25"
              d="M0,256L80,245.3C160,235,320,213,480,176C640,139,800,85,960,69.3C1120,53,1280,75,1360,85.3L1440,96V320H0Z"
            />
          </svg>

          {/* Floating shapes */}
          <div className="absolute top-16 left-16 text-white text-2xl opacity-80 floating">+</div>
          <div className="absolute top-32 left-44 text-white text-xl opacity-75 floating floating-delay-1">+</div>
          <div className="absolute top-60 left-20 text-white text-xl opacity-70 floating floating-delay-2">+</div>

          <div className="absolute top-20 right-20 w-4 h-4 rounded-full border border-white opacity-75 floating floating-delay-1"></div>
          <div className="absolute top-40 right-40 w-3 h-3 rounded-full border border-white opacity-70 floating floating-delay-2"></div>

          <div className="absolute top-24 right-12 grid grid-cols-3 gap-2 opacity-85 floating floating-delay-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
            ))}
          </div>

          {/* Panel text */}
          <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
            <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
            <p className="text-lg max-w-sm opacity-90">
              Login to continue managing your daily tasks efficiently.
            </p>
          </div>
        </div>

        {/* Right form section */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="w-full max-w-sm px-10">

            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Sign In</h2>

            <div className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              />

              {error && <p className="text-red-500 text-center text-sm">{error}</p>}

              <button
                onClick={handleLogin}
                disabled={loading || success}
                className={`w-full py-3 rounded-full font-semibold text-white flex items-center justify-center gap-2 transition ${
                  loading || success
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Signing in…
                  </>
                ) : success ? (
                  "Success!"
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="text-center text-sm pt-2">
                New here?{" "}
                <Link to="/signup" className="text-purple-600 hover:underline">
                  Create an Account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
