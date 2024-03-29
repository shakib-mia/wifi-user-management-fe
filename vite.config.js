import macrosPlugin from "vite-plugin-babel-macros";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
  server: {
    host: true,
  },
});
