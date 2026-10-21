import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { apiLocal } from "./vite.api.ts";

// Cada experiencia es un despliegue independiente (puerto fijo en local). /api/* lo sirve el plugin apiLocal.
export default defineConfig({
  plugins: [apiLocal(), react()],
  server: { host: "127.0.0.1", port: 5501, strictPort: true },
  preview: { host: "127.0.0.1", port: 5501, strictPort: true },
});
