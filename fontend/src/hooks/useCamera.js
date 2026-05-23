import { useEffect, useRef, useState } from "react";

export default function useCamera() {
  const videoRef   = useRef(null);
  const [ready,    setReady]   = useState(false);
  const [error,    setError]   = useState(null);

  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => setReady(true);
        }
      } catch (e) {
        if (e.name === "NotAllowedError") setError("Camera permission denied. Please allow camera access.");
        else if (e.name === "NotFoundError") setError("No camera found on this device.");
        else setError("Could not access camera.");
      }
    })();
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  return { videoRef, ready, error };
}