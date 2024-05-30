import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";
import mdx from "@astrojs/mdx";
import behead from "remark-behead";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
  grawlixCensorStrategy,
  keepStartCensorStrategy,
} from "obscenity";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const variables_scss = resolve(__dirname, "src/style/vars");

export default defineConfig({
  output: "static",
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
  integrations: [mdx()],
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
    const censor = new TextCensor().setStrategy(
      keepStartCensorStrategy(grawlixCensorStrategy()),
    );

    visit(tree, "text", (node) => {
      const matches = matcher.getAllMatches(node.value);
      node.value = censor.applyTo(node.value, matches);
    });
  };

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
