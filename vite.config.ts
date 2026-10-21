import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cada experiencia es un despliegue independiente: puerto fijo para que coincida con ALLOWED_ORIGINS de la API.
export default defineConfig({
  plugins: [react()],
  server: { host: "127.0.0.1", port: 5501, strictPort: true },
  preview: { host: "127.0.0.1", port: 5501, strictPort: true },
});
