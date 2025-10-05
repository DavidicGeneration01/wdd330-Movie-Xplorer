// ...existing code...
import { resolve } from "path";
import { defineConfig } from "vite";
import fs from "fs";

// ...existing code...
const rootDir = "src";

const inputs = {
  main: resolve(__dirname, "src/index.html"),
  movie: resolve(__dirname, "src/movie.html"),
  profile: resolve(__dirname, "src/profile.html"),
};

// ...existing code...
export default defineConfig({
  root: rootDir,
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: inputs,
    },
  },
});