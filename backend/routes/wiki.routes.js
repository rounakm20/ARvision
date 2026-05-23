import express from "express";

const router = express.Router();

router.get("/:query", async (req, res) => {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(req.params.query)}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!response.ok) return res.status(404).json({ message: "Not found on Wikipedia" });
    const data = await response.json();
    res.json({
      title:   data.title,
      extract: data.extract?.slice(0, 400) || "",
      url:     data.content_urls?.desktop?.page || "",
    });
  } catch {
    res.status(503).json({ message: "Wikipedia unavailable" });
  }
});

export default router;