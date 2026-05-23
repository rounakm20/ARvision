import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCamera from "../hooks/useCamera";
import useDetection from "../hooks/useDetection";
import { api } from "../utils/api";

export default function Scanner() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const { videoRef, ready, error: camError } = useCamera();
  const { predictions, modelReady, error: modelError } = useDetection(videoRef);
  const [detected, setDetected] = useState(null);
  const [objData, setObjData] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [fps, setFps] = useState(0);
  const fpsRef = useRef({ last: Date.now(), count: 0 });

  // Draw bounding boxes
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !ready) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    predictions.forEach((p) => {
      const [x, y, w, h] = p.bbox;

      // Box
      ctx.strokeStyle = "#c8f0e0";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      // Corner brackets
      const cs = 16;
      ctx.strokeStyle = "#c8f0e0";
      ctx.lineWidth = 3;
      [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(([cx, cy], i) => {
        ctx.beginPath();
        if (i === 0) { ctx.moveTo(cx, cy + cs); ctx.lineTo(cx, cy); ctx.lineTo(cx + cs, cy); }
        if (i === 1) { ctx.moveTo(cx - cs, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + cs); }
        if (i === 2) { ctx.moveTo(cx, cy - cs); ctx.lineTo(cx, cy); ctx.lineTo(cx + cs, cy); }
        if (i === 3) { ctx.moveTo(cx - cs, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy - cs); }
        ctx.stroke();
      });

      // Label tag
      ctx.fillStyle = "rgba(7,8,11,0.85)";
      ctx.fillRect(x, y - 32, 200, 32);
      ctx.fillStyle = "#c8f0e0";
      ctx.font = "bold 13px monospace";
      ctx.fillText(
        `${p.class}  ${Math.round(p.score * 100)}%  TAP →`,
        x + 8,
        y - 10
      );
    });

    // FPS
    fpsRef.current.count++;
    const now = Date.now();
    if (now - fpsRef.current.last >= 1000) {
      setFps(fpsRef.current.count);
      fpsRef.current = { last: now, count: 0 };
    }

    // Best prediction
    if (predictions.length > 0) {
      const best = predictions.reduce((a, b) => (a.score > b.score ? a : b));
      setDetected(best);
    } else {
      setDetected(null);
      setCardOpen(false);
      setObjData(null);
    }
  }, [predictions, ready]);

  // Fetch object data from backend
  useEffect(() => {
    if (!detected) return;
    api
      .getObjectByLabel(detected.class)
      .then((d) => {
        if (!d.message) {
          setObjData(d);
          setCardOpen(true);
        }
      })
      .catch(() => {});
  }, [detected?.class]);

  const status = !ready
    ? "Initializing camera…"
    : !modelReady
    ? "Loading AI model…"
    : predictions.length > 0
    ? `Detected: ${predictions[0].class}`
    : "Scanning…";

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Detection canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Error state */}
      {(camError || modelError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#07080b]">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-[#eceef4] font-sans text-lg mb-2">
              {camError || modelError}
            </p>
            <p className="text-[#5a6175] text-sm font-mono">
              Check permissions and refresh
            </p>
          </div>
        </div>
      )}

      {/* HUD Top */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-black/70 to-transparent">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-[#8892a8] hover:text-[#eceef4] transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-4 py-2">
          <span className={`w-2 h-2 rounded-full ${modelReady && ready ? "bg-[#c8f0e0] animate-pulse" : "bg-yellow-400"}`} />
          <span className="font-mono text-[11px] text-[#8892a8] tracking-wider">
            {status}
          </span>
        </div>

        <div className="bg-black/50 border border-white/10 rounded-full px-3 py-2 font-mono text-[11px] text-[#5a6175]">
          {fps} fps
        </div>
      </div>

      {/* Scan frame corners */}
      <div className="absolute inset-[15%] pointer-events-none">
        {[
          ["top-0 left-0", "border-t-2 border-l-2"],
          ["top-0 right-0", "border-t-2 border-r-2"],
          ["bottom-0 left-0", "border-b-2 border-l-2"],
          ["bottom-0 right-0", "border-b-2 border-r-2"],
        ].map(([pos, bdr]) => (
          <span key={pos} className={`absolute ${pos} w-8 h-8 border-[#c8f0e0]/50 ${bdr}`} />
        ))}
      </div>

      {/* ── DETECTED OBJECT CARD ── */}
      {objData && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#07080b] border-t border-white/7 rounded-t-2xl transition-transform duration-500 ${
            cardOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Handle */}
          <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mt-3 mb-1" />

          {/* Tappable area → goes to Detail */}
          <div
            className="flex items-center gap-3 px-5 py-4 cursor-pointer active:bg-white/5 transition-colors"
            onClick={() => navigate(`/detail/${objData._id}`)}
          >
            <span className="text-4xl">{objData.emoji}</span>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-[#eceef4] mb-0.5">
                {objData.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#c8f0e0]">
                  {Math.round((detected?.score || 0) * 100)}% confident
                </span>
                <span className="text-[#3a3f4a]">·</span>
                <span className="font-mono text-[11px] text-[#3a3f4a]">
                  {objData.category}
                </span>
              </div>
            </div>
            {/* Arrow → tap hint */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-[#c8f0e0]/10 border border-[#c8f0e0]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#c8f0e0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <span className="font-mono text-[9px] text-[#3a3f4a] tracking-wider">TAP</span>
            </div>
          </div>

          {/* Description preview */}
          <div className="px-5 pb-3">
            <p className="text-[13px] text-[#5a6175] leading-relaxed line-clamp-2">
              {objData.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 px-5 pb-5 flex-wrap">
            {objData.tags?.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-[#3a3f4a] bg-white/5 border border-white/7 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {/* Full details button */}
            <button
              onClick={() => navigate(`/detail/${objData._id}`)}
              className="ml-auto font-mono text-[11px] text-[#c8f0e0] bg-[#c8f0e0]/10 border border-[#c8f0e0]/20 px-3 py-1 rounded-full hover:bg-[#c8f0e0]/20 transition-colors"
            >
              Full Details →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}