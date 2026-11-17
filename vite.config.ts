import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // NEW IN DAY 4: the Tailwind plugin for Vite

export default defineConfig({
  plugins: [react(), tailwindcss()], // NEW IN DAY 4: tailwindcss() added to the plugin list
});