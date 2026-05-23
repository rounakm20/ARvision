import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import BottomBar from "../components/BottomBar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#07080b] overflow-x-hidden">
      <Background />
      <Navbar />
      <main>
        <HeroSection />
        <FeatureCards />
      </main>
      <BottomBar />
    </div>
  );
}