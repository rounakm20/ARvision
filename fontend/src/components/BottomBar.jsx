const stats = [
  { num: "80+", label: "objects" },
  { num: "95%", label: "accuracy" },
  { num: "30fps", label: "real-time" },
];

export default function BottomBar() {
  return (
    <div className="relative z-10 flex items-center justify-between px-10 py-4 bg-[#0c0e14] border-t border-white/7">
      <span className="font-mono text-[10px] text-[#2e323c] tracking-[0.07em]">
        ARVision · v1.0 · 2025
      </span>

      <div className="flex items-center gap-4">
        {/* Stats */}
        <div className="flex items-center gap-3">
          {stats.map((s) => (
            <span key={s.label} className="font-mono text-[10px] text-[#2e323c] tracking-[0.06em]">
              <span className="text-[#a8dfc8]">{s.num}</span> {s.label}
            </span>
          ))}
        </div>

        {/* Divider */}
        <span className="w-px h-4 bg-white/7" />

        {/* Status */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#5a6175]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#c8f0e0] animate-pulse" />
          Model ready
        </div>
      </div>
    </div>
  );
}
