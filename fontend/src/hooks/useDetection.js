import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const CONFIDENCE_THRESHOLD = 0.6;

export default function useDetection(videoRef) {
  const modelRef  = useRef(null);
  const rafRef    = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [modelReady,  setModelReady]  = useState(false);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        modelRef.current = await cocoSsd.load({ base: "lite_mobilenet_v2" });
        if (!cancelled) setModelReady(true);
      } catch (e) {
        if (!cancelled) setError("Failed to load AI model");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!modelReady || !videoRef?.current) return;

    const detect = async () => {
      const video = videoRef.current;
      if (video.readyState === 4) {
        const preds = await modelRef.current.detect(video);
        const filtered = preds.filter((p) => p.score >= CONFIDENCE_THRESHOLD);
        setPredictions(filtered);
      }
      rafRef.current = requestAnimationFrame(detect);
    };

    rafRef.current = requestAnimationFrame(detect);
    return () => cancelAnimationFrame(rafRef.current);
  }, [modelReady, videoRef]);

  return { predictions, modelReady, error };
}