import { getEntry as get_entry } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const {
    data: { social_media },
  } = await get_entry("authors", "morganlabs");
  return social_media.map((social) => ({
    params: { slug: social.title.toLowerCase() },
    props: { social },
  }));
}

export const GET: APIRoute = async ({ redirect, props: { social } }) =>
  redirect(social.href, 301);
