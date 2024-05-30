import { z, reference, defineCollection } from "astro:content";
const { object, number, array, string, date } = z;

const authors = defineCollection({
  type: "content",
  schema: object({
    name: string(),
    email: string().email().optional(),
    kicker: string(),
    social_media: array(object({ title: string(), href: string() })),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: object({
    authors: array(reference("authors")).default(["morganlabs"]),
    title: string(),
    kicker: string(),
    published: date(),
    tags: array(reference("tags")),
    hero_alt: string(),
  }),
});

const tags = defineCollection({
  type: "data",
  schema: object({
    name: string(),
    description: string(),
  }),
});

export const collections = {
  authors,
  blog,
  tags,
};
