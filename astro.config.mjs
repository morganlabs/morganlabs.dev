import { defineConfig as define_config } from "astro/config";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const variables_scss = resolve(__dirname, "src/style/vars");


// https://astro.build/config
export default defineConfig(define_config({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${variables_scss}" as *;`
        }
      }
    }
  },
  redirects: {
    "/favicon.ico": "/fav/favicon.ico"
  }
}));