import inject from "@rollup/plugin-inject";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inject({
      process: "process/browser",
    }),
  ],
  define: {
    global: {},
  },
});
