// Vercel deploys this as a serverless function and routes every
// /api/* request to it. Express apps are valid (req, res) handlers,
// so the exact same app from server/app.js runs here unchanged —
// no server to manage, Vercel just invokes it per request.
import app from "../server/app.js";

export default app;
