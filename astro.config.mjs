import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import icon from "astro-icon";

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

  integrations: [
    icon({
      include: {
        mdi: ["github", "mastodon", "linkedin", "donate"],
        ic: ["baseline-discord"],
      },
    }),
  ],
});

