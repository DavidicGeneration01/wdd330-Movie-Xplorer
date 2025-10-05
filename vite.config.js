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

// add product_pages entries only if they exist
// const productDir = resolve(__dirname, "src/product_pages");
// if (fs.existsSync(productDir)) {
//   const files = fs.readdirSync(productDir).filter((f) => f.endsWith(".html"));
//   // if there's an index.html use product key, otherwise add each file with its name
//   if (files.includes("index.html")) {
//     inputs.product = resolve(productDir, "index.html");
//   } else {
//     files.forEach((f) => {
//       const name = f.replace(/\.html$/, "");
//       inputs[`product_${name}`] = resolve(productDir, f);
//     });
//   }
// }

// export default defineConfig({
//   root: rootDir,
//   base: "./",
//   build: {
//     outDir: "../dist",
//     emptyOutDir: true,
//     rollupOptions: {
//       input: inputs,
//     },
//   },
// });