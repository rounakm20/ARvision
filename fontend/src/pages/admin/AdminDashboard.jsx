import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const EMPTY = { name:"", emoji:"📦", category:"", description:"", usage:"", cocoLabel:"", tags:"", steps:"" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [delId, setDelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const user = localStorage.getItem("arvision_user") || "Admin";

  const load = () => {
    api.getAllObjects()
      .then((d) => { if (Array.isArray(d)) setObjects(d); })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("arvision_token");
    if (!token) { navigate("/admin"); return; }
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem("arvision_token");
    localStorage.removeItem("arvision_user");
    navigate("/admin");
  };

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal("add"); };
  const openEdit = (obj) => {
    setForm({ ...obj, tags: obj.tags?.join(", "), steps: obj.steps?.map((s) => `${s.title}: ${s.description}`).join("\n") });
    setEditId(obj._id);
    setModal("edit");
  };

  const parseSteps = (raw) =>
    raw.split("\n").filter(Boolean).map((line, i) => {
      const [title, ...rest] = line.split(":");
      return { order: i + 1, title: title.trim(), description: rest.join(":").trim() };
    });

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()), steps: parseSteps(form.steps || "") };
    try {
      if (modal === "add") await api.createObject(payload);
      else await api.updateObject(editId, payload);
      setModal(null); load();
    } catch { alert("Save failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    await api.deleteObject(delId);
    setDelId(null); load();
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-[#eceef4]">
      <nav className="flex items-center justify-between px-8 h-[62px] border-b border-white/7">
        <div className="flex items-center gap-3">
          <span className="font-serif text-[17px]">ARVision</span>
          <span className="font-mono text-[10px] text-[#c8f0e0] bg-[#c8f0e0]/10 px-2 py-0.5 rounded-full">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-[#5a6175]">{user}</span>
          <button onClick={logout} className="px-4 py-2 rounded-lg border border-white/7 text-[12px] text-[#5a6175] hover:text-[#eceef4] font-mono">Logout</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[["Total Objects", objects.length], ["Active", objects.filter((o) => o.isActive).length], ["Categories", new Set(objects.map((o) => o.category)).size]].map(([l, v]) => (
            <div key={l} className="bg-white/3 border border-white/7 rounded-xl p-5">
              <div className="font-mono text-[24px] font-bold text-[#c8f0e0] mb-1">{v}</div>
              <div className="font-mono text-[11px] text-[#3a3f4a] uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg">Object Database</h2>
          <button onClick={openAdd} className="px-4 py-2 rounded-lg bg-[#c8f0e0] text-[#07080b] text-[13px] font-semibold hover:bg-[#a8dfc8]">+ Add Object</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#c8f0e0]/20 border-t-[#c8f0e0] rounded-full animate-spin" /></div>
        ) : (
          <div className="bg-white/3 border border-white/7 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/7">
                  {["Object","Category","COCO Label","Status","Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-mono text-[10px] text-[#3a3f4a] uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {objects.map((obj) => (
                  <tr key={obj._id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-3.5 flex items-center gap-2"><span>{obj.emoji}</span><span className="text-[13px]">{obj.name}</span></td>
                    <td className="px-4 py-3.5"><span className="font-mono text-[11px] text-[#c8f0e0] bg-[#c8f0e0]/10 px-2 py-0.5 rounded-full">{obj.category}</span></td>
                    <td className="px-4 py-3.5 font-mono text-[12px] text-[#5a6175]">{obj.cocoLabel}</td>
                    <td className="px-4 py-3.5"><span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${obj.isActive ? "text-[#c8f0e0] bg-[#c8f0e0]/10 border-[#c8f0e0]/20" : "text-[#5a6175] bg-white/5 border-white/10"}`}>{obj.isActive ? "Active" : "Inactive"}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(obj)} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/7 text-[11px] font-mono text-[#8892a8] hover:text-[#eceef4]">Edit</button>
                        <button onClick={() => setDelId(obj._id)} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-400">Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {objects.length === 0 && <div className="text-center py-12 font-mono text-[12px] text-[#3a3f4a]">No objects yet. Add one!</div>}
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-end md:items-center justify-center z-50 px-4 pb-4">
          <div className="bg-[#0c0e14] border border-white/7 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/7 sticky top-0 bg-[#0c0e14]">
              <h3 className="font-serif text-lg">{modal === "add" ? "Add New Object" : "Edit Object"}</h3>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#5a6175]">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {[["name","Object Name","e.g. Laptop"],["emoji","Emoji","💻"],["category","Category","e.g. Electronics"],["cocoLabel","COCO-SSD Label","e.g. laptop"],["tags","Tags (comma separated)","e.g. tech, portable"]].map(([key,label,ph]) => (
                <div key={key}>
                  <label className="font-mono text-[10px] text-[#5a6175] uppercase tracking-widest block mb-1.5">{label}</label>
                  <input type="text" placeholder={ph} value={form[key]} onChange={(e) => setForm({...form,[key]:e.target.value})}
                    className="w-full bg-white/5 border border-white/7 rounded-lg py-2.5 px-3.5 text-[13px] text-[#eceef4] placeholder-[#3a3f4a] outline-none focus:border-[#c8f0e0]/30 font-sans" />
                </div>
              ))}
              {[["description","Description","Brief description…"],["usage","Usage","How is it used?"]].map(([key,label,ph]) => (
                <div key={key}>
                  <label className="font-mono text-[10px] text-[#5a6175] uppercase tracking-widest block mb-1.5">{label}</label>
                  <textarea placeholder={ph} value={form[key]} rows={3} onChange={(e) => setForm({...form,[key]:e.target.value})}
                    className="w-full bg-white/5 border border-white/7 rounded-lg py-2.5 px-3.5 text-[13px] text-[#eceef4] placeholder-[#3a3f4a] outline-none focus:border-[#c8f0e0]/30 resize-none font-sans" />
                </div>
              ))}
              <div>
                <label className="font-mono text-[10px] text-[#5a6175] uppercase tracking-widest block mb-1.5">Steps (Title: Description)</label>
                <textarea placeholder={"Power On: Press hold button\nLogin: Enter password"} value={form.steps} rows={4} onChange={(e) => setForm({...form,steps:e.target.value})}
                  className="w-full bg-white/5 border border-white/7 rounded-lg py-2.5 px-3.5 text-[13px] text-[#eceef4] placeholder-[#3a3f4a] outline-none focus:border-[#c8f0e0]/30 resize-none font-mono" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-white/7 sticky bottom-0 bg-[#0c0e14]">
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-lg border border-white/7 text-[13px] text-[#5a6175]">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 rounded-lg bg-[#c8f0e0] text-[#07080b] text-[13px] font-semibold disabled:opacity-50">
                {saving ? "Saving…" : "Save Object"}
              </button>
            </div>
          </div>
        </div>
      )}

      {delId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0c0e14] border border-white/7 rounded-2xl p-6 w-full max-w-sm text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="font-serif text-lg mb-2">Delete Object?</h3>
            <p className="font-sans text-[13px] text-[#5a6175] mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-3 rounded-lg border border-white/7 text-[13px] text-[#5a6175]">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 rounded-lg bg-red-500/80 text-white text-[13px] font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}