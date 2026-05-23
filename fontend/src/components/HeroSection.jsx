import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TITLES = [
  "Understand it.",
  "Detect it.",
  "Explain it.",
  "Explore it.",
  "Learn from it.",
  "Identify it.",
];

const TICKERS = [
  "Detecting objects in real time",
  "Rendering AR overlays instantly",
  "Pulling step-by-step guides",
  "Fetching Wikipedia context",
  "Running fully on-device",
  "Zero cloud dependency",
];

function useSwap(items, delay = 2600, start = 2000) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setPhase("exit");
        setTimeout(() => {
          setIdx((i) => (i + 1) % items.length);
          setPhase("enter");
          setTimeout(() => setPhase("idle"), 380);
        }, 270);
      }, delay);
      return () => clearInterval(id);
    }, start);
    return () => clearTimeout(t);
  }, []);

  return { text: items[idx], phase };
}

export default function HeroSection() {
  const navigate = useNavigate();
  const title = useSwap(TITLES);
  const ticker = useSwap(TICKERS);

  const titleClass =
    title.phase === "exit"
      ? "opacity-0 -translate-y-5"
      : "opacity-100 translate-y-0";

  const tickerClass =
    ticker.phase === "exit"
      ? "opacity-0 translate-x-2"
      : "opacity-100 translate-x-0";

  return (
    <section className="relative z-10 flex flex-col items-center text-center pt-[88px] pb-0 px-8 gap-0">
      {/* Tag */}
      <div
        className="flex items-center gap-2 font-mono text-[10px] text-[#5a6175] tracking-[0.12em] uppercase mb-8 opacity-0 animate-up"
        style={{ animationDelay: "0.04s" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#c8f0e0] animate-pulse flex-shrink-0" />
        Web-based AR · Object Intelligence System
      </div>

      {/* Headline */}
      <h1
        className="font-serif text-[clamp(46px,7vw,74px)] leading-[1.01] tracking-[-0.025em] text-[#eceef4] max-w-[680px] mb-2.5 opacity-0 animate-up"
        style={{ animationDelay: "0.1s" }}
      >
        See the world.
        <br />
        <span
          className={`italic text-[#c8f0e0] inline-block transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${titleClass}`}
        >
          {title.text}
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-[15.5px] text-[#8892a8] leading-[1.75] max-w-[420px] font-light mb-9 opacity-0 animate-up"
        style={{ animationDelay: "0.18s" }}
      >
        Point your camera at any object. Get instant AR overlays, step-by-step
        guides, and live Wikipedia data — all on-device, zero cloud delay.
      </p>

      {/* Ticker pill */}
      <div
        className="flex items-center gap-2.5 mb-10 opacity-0 animate-up"
        style={{ animationDelay: "0.24s" }}
      >
        <div className="flex items-center gap-2 bg-[#11141c] border border-white/7 rounded-full px-4 py-2">
          <span className="w-[5px] h-[5px] rounded-full bg-[#c8f0e0] flex-shrink-0 animate-pulse" />
          <span
            className={`font-mono text-[11px] text-[#8892a8] tracking-[0.04em] min-w-[240px] text-left transition-all duration-300 ${tickerClass}`}
          >
            {ticker.text}
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="flex items-center gap-3 mb-16 opacity-0 animate-up"
        style={{ animationDelay: "0.3s" }}
      >
        {/* Scan button */}
        <button
          onClick={() => navigate("/scanner")}
          className="relative flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] bg-[#c8f0e0] border-none text-[15px] font-semibold text-[#07080b] font-sans cursor-pointer transition-all duration-200 overflow-hidden hover:-translate-y-0.5 active:scale-[0.97] group"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="relative w-[22px] h-[22px] flex-shrink-0">
            <span className="absolute top-0 left-0 w-[7px] h-[7px] border-t-[1.5px] border-l-[1.5px] border-[#07080b]" />
            <span className="absolute top-0 right-0 w-[7px] h-[7px] border-t-[1.5px] border-r-[1.5px] border-[#07080b]" />
            <span className="absolute bottom-0 left-0 w-[7px] h-[7px] border-b-[1.5px] border-l-[1.5px] border-[#07080b]" />
            <span className="absolute bottom-0 right-0 w-[7px] h-[7px] border-b-[1.5px] border-r-[1.5px] border-[#07080b]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#07080b]" />
          </span>
          Start Scanning
        </button>

        {/* Learn more button */}
        <button
          onClick={() => navigate("/catalog")}
          className="px-6 py-3.5 rounded-[10px] text-[15px] font-sans font-normal text-[#8892a8] bg-transparent border border-white/7 cursor-pointer transition-all duration-200 hover:text-[#eceef4] hover:border-white/12 hover:bg-white/3"
        >
          Learn more →
        </button>
      </div>
    </section>
  );
}