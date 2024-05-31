import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import mdx from "@astrojs/mdx";
import behead from "remark-behead";
import sitemap from "@astrojs/sitemap";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const variables_scss = resolve(__dirname, "src/style/vars");

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://www.morganlabs.dev",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [[behead, { minDepth: 2 }], censor],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${variables_scss}" as *;`,
        },
      },
    },
  },
  redirects: {
    "/favicon.ico": "/fav/favicon.ico",
    "/support": "/s/ko-fi",
    "/s/[slug]": "/social/[slug]",
  },
});

function censor() {
  return (tree) => {
    const matcher = new RegExpMatcher({
      ...englishDataset.build(),
      ...englishRecommendedTransformers,
    });
    const censor = new TextCensor().setStrategy(censor_strategy);
    visit(tree, "text", (node) => {
      const matches = matcher.getAllMatches(node.value);
      node.value = censor.applyTo(node.value, matches);
    });
  };
  function censor_strategy({ input, startIndex, endIndex }) {
    const word = input.slice(startIndex, endIndex + 1);
    const first = word[0];
    const rest = word.slice(1).split("").map(censor_letter).join("");
    return first + rest;
  }
  function censor_letter(letter) {
    const letter_map = new Map()
      .set("a", "@")
      .set("s", "$")
      .set("h", "#")
      .set("i", "!")
      .set("t", "~");
    const match = letter_map.get(letter.toLowerCase());
    if (match) return match;
    else return random_character();
  }
  function random_character() {
    const chars = "!?£-";
    return chars[Math.floor(Math.random() * chars.length)];
  }
  function visit(node, type, callback) {
    if (Array.isArray(node)) {
      node.forEach((child) => visit(child, type, callback));
    } else if (node.type === type) {
      callback(node);
    } else if (node.children) {
      node.children.forEach((child) => visit(child, type, callback));
    }
  }
}
