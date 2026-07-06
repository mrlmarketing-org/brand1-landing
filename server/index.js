import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "..", "dist");

// Standalone local/production runner: same Express app used by the
// Vercel function wrapper (api/[...all].js), plus serving the built
// frontend so one process can run the whole site outside of Vercel.
app.use(express.static(distPath));
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) res.status(404).send("Not found — did you run npm run build?");
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
