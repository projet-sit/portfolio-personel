import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Configuration Vite : React pour l'interface et Tailwind CSS pour le style.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
