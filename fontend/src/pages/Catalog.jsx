import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function Catalog() {
  const navigate = useNavigate();
  const [objects,  setObjects]  = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search,   setSearch]   = useState("");
  const [cat,      setCat]      = useState("All");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.getObjects().then((d) => { setObjects(d); setFiltered(d); setLoading(false); });
  }, []);

  useEffect(() => {
    let res = objects;
    if (cat !== "All") res = res.filter((o) => o.category === cat);
    if (search) res = res.filter((o) => o.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(res);
  }, [search, cat, objects]);

  const categories = ["All", ...new Set(objects.map((o) => o.category))];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#eceef4]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
        <button onClick={() => navigate("/")} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#8892a8] hover:text-[#eceef4]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="font-serif text-lg">Object Catalog</h1>
        <button onClick={() => navigate("/scanner")} className="px-4 py-2 rounded-lg bg-[#c8f0e0] text-[#07080b] text-[13px] font-semibold">Scan</button>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-5">
        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a3f4a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search objects…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/7 rounded-xl py-3 pl-11 pr-4 text-[14px] text-[#eceef4] placeholder-[#3a3f4a] outline-none focus:border-[#c8f0e0]/30 transition-colors font-sans" />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-[11px] tracking-wider border transition-all ${cat === c ? "bg-[#c8f0e0]/10 border-[#c8f0e0]/30 text-[#c8f0e0]" : "bg-transparent border-white/7 text-[#5a6175] hover:text-[#eceef4]"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#c8f0e0]/20 border-t-[#c8f0e0] rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-8">
            {filtered.map((obj) => (
              <div key={obj._id} onClick={() => navigate(`/detail/${obj._id}`)}
                className="bg-white/3 border border-white/7 rounded-xl p-4 cursor-pointer hover:border-[#c8f0e0]/20 hover:-translate-y-0.5 transition-all group">
                <span className="text-3xl block mb-3">{obj.emoji}</span>
                <div className="font-sans text-[14px] font-medium mb-1">{obj.name}</div>
                <div className="font-mono text-[10px] text-[#3a3f4a]">{obj.category}</div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-12 text-[#3a3f4a] font-mono text-[12px]">No objects found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}