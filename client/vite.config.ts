import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import config from "./src/config";

export default defineConfig({
  base: "/TC2005B_601_08/dist-regular/",
  plugins: [react()],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  build: {
    outDir: "dist", // Output directory for the build
  },
});
