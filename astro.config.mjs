import { defineConfig as define_config } from "astro/config";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import mdx from "@astrojs/mdx";
import behead from "remark-behead";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const variables_scss = resolve(__dirname, "src/style/vars");

// https://astro.build/config
export default define_config({
  markdown: {
    remarkPlugins: [[behead, { minDepth: 2 }]],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${variables_scss}" as *;`,
        },
      },
    },
    plugins: [mdx()],
  },
  redirects: {
    "/favicon.ico": "/fav/favicon.ico",
  },
});
