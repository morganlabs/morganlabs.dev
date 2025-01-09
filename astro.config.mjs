import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${__dirname}/src/styles/vars" as *;\n`,
        },
      },
    },
  },
});
