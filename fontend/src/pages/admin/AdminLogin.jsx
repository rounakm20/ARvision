import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      const res = await api.login(form.email, form.password);
      if (res.token) {
        localStorage.setItem("arvision_token", res.token);
        localStorage.setItem("arvision_user", res.username);
        navigate("/admin/dashboard");
      } else {
        setError(res.message || "Invalid credentials");
      }
    } catch {
      setError("Login failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080b] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[#5a6175] font-mono text-[12px] mb-8 hover:text-[#eceef4] transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#c8f0e0]/10 border border-[#c8f0e0]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#c8f0e0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="font-serif text-2xl text-[#eceef4] mb-1">Admin Portal</h1>
          <p className="font-mono text-[11px] text-[#3a3f4a] tracking-wider">Authorized personnel only</p>
        </div>

        <div className="bg-white/3 border border-white/7 rounded-2xl p-6 space-y-4">
          <div>
            <label className="font-mono text-[10px] text-[#5a6175] uppercase tracking-widest block mb-2">Email</label>
            <input type="email" placeholder="admin@arvision.io" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/7 rounded-lg py-3 px-4 text-[14px] text-[#eceef4] placeholder-[#3a3f4a] outline-none focus:border-[#c8f0e0]/30 transition-colors font-sans" />
          </div>
          <div>
            <label className="font-mono text-[10px] text-[#5a6175] uppercase tracking-widest block mb-2">Password</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full bg-white/5 border border-white/7 rounded-lg py-3 px-4 text-[14px] text-[#eceef4] placeholder-[#3a3f4a] outline-none focus:border-[#c8f0e0]/30 transition-colors font-sans" />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-[13px] text-red-400 font-mono">
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-3 rounded-lg bg-[#c8f0e0] text-[#07080b] font-semibold text-[14px] hover:bg-[#a8dfc8] transition-colors disabled:opacity-50">
            {loading ? "Signing in…" : "Access Dashboard →"}
          </button>
        </div>

        <p className="text-center font-mono text-[10px] text-[#2e323c] mt-4">
          Demo: admin@arvision.io / admin123
        </p>
      </div>
    </div>
  );
}