import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards form submissions to the Express + Resend backend
      // (see server/index.js) during local development.
      "/api": "http://localhost:3001",
    },
  },
});
