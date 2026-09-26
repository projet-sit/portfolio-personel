import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Entrées séparées : le dashboard ne fait pas partie du HTML public.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        portfolio: path.resolve(__dirname, "index.html"),
        adminLogin: path.resolve(__dirname, "admin/login/index.html"),
        adminDashboard: path.resolve(__dirname, "admin/index.html"),
      },
    },
  },
});
