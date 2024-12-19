import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Connections",
        short_name: "Connections",
        display: "fullscreen",
        description: "Based on the classic game",
        background_color: "#c6c6c6",
        icons: [
          {
            src: "/connections.svg",
            sizes:
              "48x48 72x72 96x96 120x120 128x128 144x144 180x180 256x256 512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/connections.svg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        theme_color: "#494757",
      },
    }),
  ],
  server: {
    host: "localhost",
    port: 3000,
  },
  envDir: "./environments",
});
