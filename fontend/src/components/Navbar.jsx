import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 flex items-center justify-between px-10 h-[62px] border-b border-white/7">
      {/* Brand */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <div className="w-[26px] h-[26px] rounded-lg bg-[#c8f0e0] flex items-center justify-center flex-shrink-0">
          <svg className="w-[13px] h-[13px] text-[#07080b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          </svg>
        </div>
        <span className="font-outfit font-extrabold text-[17px] tracking-tight text-[#eceef4]">
          AR<span className="text-[#c8f0e0]">Vision</span>
        </span>
      </div>

      {/* Center links */}
      <div className="flex items-center gap-0.5">
        {[
          { label: "Home",    path: "/" },
          { label: "Detail",   path: "/detail/:id" },
          { label: "Catalog", path: "/catalog" },
        ].map((link) => (
          <button
            key={link.label}
            onClick={() => navigate(link.path)}
            className="px-3.5 py-1.5 rounded-lg text-[13px] text-[#5a6175] bg-transparent border-none font-sans cursor-pointer transition-all duration-200 hover:text-[#eceef4] hover:bg-white/5"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 rounded-lg text-[13px] text-[#5a6175] bg-transparent border border-white/7 font-sans cursor-pointer transition-all duration-200 hover:text-[#eceef4] hover:border-white/12"
        >
          Admin
        </button>
        <button
          onClick={() => navigate("/scanner")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#c8f0e0] border-none text-[13px] font-semibold text-[#07080b] font-sans cursor-pointer transition-all duration-200 hover:bg-[#a8dfc8] hover:-translate-y-px"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          </svg>
          Scan Now
        </button>
      </div>
    </nav>
  );
}