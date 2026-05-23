const features = [
  {
    num: "01",
    title: "AI Detection",
    desc: "COCO-SSD model. 80+ object classes running at 30fps on any modern device.",
  },
  {
    num: "02",
    title: "AR Overlays",
    desc: "WebXR + A-Frame renders stable 3D labels anchored to real-world objects.",
  },
  {
    num: "03",
    title: "Step Guides",
    desc: "Tap any label to get sequential instructions pulled live from MongoDB.",
  },
  {
    num: "04",
    title: "Live Wiki",
    desc: "Wikipedia REST API enriches every detected object in real time.",
  },
];

export default function FeatureCards() {
  return (
    <div className="relative z-10 flex border-t border-b border-white/7">
      {features.map((f, i) => (
        <div
          key={f.num}
          className={`
            flex-1 px-6 py-7 relative overflow-hidden cursor-default
            transition-colors duration-200 group
            hover:bg-[rgba(200,240,224,0.03)]
            ${i < features.length - 1 ? "border-r border-white/7" : ""}
          `}
        >
          {/* Top accent line — sweeps in on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c8f0e0] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

          <div className="font-mono text-[10px] text-[#2e323c] tracking-[0.14em] mb-3.5">
            {f.num}
          </div>
          <div className="text-[13px] font-semibold text-[#eceef4] mb-1.5">
            {f.title}
          </div>
          <div className="text-[11.5px] text-[#2e323c] leading-[1.65]">
            {f.desc}
          </div>
        </div>
      ))}
    </div>
  );
}
