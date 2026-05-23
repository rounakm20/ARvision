import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import useWiki from "../hooks/useWiki";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [obj,     setObj]     = useState(null);
  const [tab,     setTab]     = useState("overview");
  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(true);
  const { data: wiki, loading: wikiLoad } = useWiki(obj?.name);

  useEffect(() => {
    api.getObjectById(id)
      .then((d) => { setObj(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#07080b]">
      <div className="w-8 h-8 border-2 border-[#c8f0e0]/20 border-t-[#c8f0e0] rounded-full animate-spin" />
    </div>
  );
  if (!obj) return (
    <div className="flex items-center justify-center min-h-screen bg-[#07080b] text-[#eceef4]">
      Object not found.
    </div>
  );

  const tabs = ["overview", "usage", "steps", "wiki"];

  return (
    <div className="min-h-screen bg-[#07080b] text-[#eceef4]">
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/7">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#8892a8] hover:text-[#eceef4]">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span className="font-mono text-[11px] text-[#5a6175] tracking-wider uppercase">Object Intelligence</span>
        <div className="w-10" />
      </div>

      <div className="max-w-2xl mx-auto px-5 pb-16">
        {/* Hero */}
        <div className="flex items-center gap-4 py-6 border-b border-white/7 mb-5">
          <span className="text-5xl">{obj.emoji}</span>
          <div>
            <h1 className="font-serif text-2xl mb-1">{obj.name}</h1>
            <div className="flex gap-2">
              <span className="font-mono text-[11px] text-[#c8f0e0] bg-[#c8f0e0]/10 px-3 py-1 rounded-full">{obj.category}</span>
              <span className="font-mono text-[11px] text-[#5a6175] bg-white/5 px-3 py-1 rounded-full">{obj.tags?.[0]}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6 gap-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-[12px] font-mono tracking-wider uppercase transition-all ${tab === t ? "bg-[#c8f0e0] text-[#07080b] font-bold" : "text-[#5a6175] hover:text-[#eceef4]"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-4 animate-up">
            <div className="bg-white/3 border border-white/7 rounded-xl p-5">
              <div className="font-mono text-[10px] text-[#c8f0e0] uppercase tracking-widest mb-2">Description</div>
              <p className="text-[14px] text-[#8892a8] leading-relaxed">{obj.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Category", obj.category], ["Tags", obj.tags?.join(", ")], ["COCO Label", obj.cocoLabel], ["Status", obj.isActive ? "Active" : "Inactive"]].map(([k, v]) => (
                <div key={k} className="bg-white/3 border border-white/7 rounded-xl p-4">
                  <div className="font-mono text-[10px] text-[#3a3f4a] uppercase tracking-wider mb-1">{k}</div>
                  <div className="text-[13px] font-medium text-[#eceef4]">{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage */}
        {tab === "usage" && (
          <div className="bg-white/3 border border-white/7 rounded-xl p-5 animate-up">
            <div className="font-mono text-[10px] text-[#c8f0e0] uppercase tracking-widest mb-3">Usage</div>
            <p className="text-[14px] text-[#8892a8] leading-relaxed">{obj.usage}</p>
          </div>
        )}

        {/* Steps */}
        {tab === "steps" && (
          <div className="animate-up">
            <div className="flex justify-between items-center mb-4">
              <span className="font-sans text-[14px] font-medium">Step Guide</span>
              <span className="font-mono text-[11px] text-[#c8f0e0]">
                {step + 1} / {obj.steps?.length || 0}
              </span>
            </div>
            <div className="space-y-3 mb-6">
              {obj.steps?.map((s, i) => (
                <div key={i} onClick={() => setStep(i)}
                  className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all ${i === step ? "border-[#c8f0e0]/30 bg-[#c8f0e0]/5" : i < step ? "border-white/7 opacity-50" : "border-white/7"}`}>
                  <span className="font-mono text-[12px] text-[#c8f0e0] min-w-[28px] pt-0.5">
                    {i < step ? "✓" : `0${s.order}`}
                  </span>
                  <div>
                    <div className="font-medium text-[13px] mb-1">{s.title}</div>
                    <div className="text-[12px] text-[#5a6175] leading-relaxed">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="flex-1 py-3 rounded-xl border border-white/7 text-[13px] text-[#5a6175] hover:text-[#eceef4] transition-colors">
                ← Previous
              </button>
              <button onClick={() => setStep((s) => Math.min((obj.steps?.length || 1) - 1, s + 1))}
                className="flex-1 py-3 rounded-xl bg-[#c8f0e0] text-[#07080b] text-[13px] font-semibold hover:bg-[#a8dfc8] transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Wiki */}
        {tab === "wiki" && (
          <div className="animate-up">
            {wikiLoad && <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#c8f0e0]/20 border-t-[#c8f0e0] rounded-full animate-spin" /></div>}
            {wiki && (
              <div className="bg-white/3 border border-white/7 rounded-xl p-5">
                <div className="font-mono text-[10px] text-[#5a6175] mb-3">📖 Wikipedia</div>
                <p className="text-[14px] text-[#8892a8] leading-relaxed mb-4">{wiki.extract}</p>
                <a href={wiki.url} target="_blank" rel="noreferrer"
                  className="font-mono text-[12px] text-[#c8f0e0] border-b border-[#c8f0e0]/30 pb-0.5">
                  Read full article ↗
                </a>
              </div>
            )}
            {!wikiLoad && !wiki && (
              <div className="text-center py-10 text-[#5a6175] font-mono text-[12px]">
                Wikipedia data unavailable
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}