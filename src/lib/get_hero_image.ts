export function get_hero_image(id: string) {
  const hero_images = Object.entries(
    import.meta.glob<{ default: ImageMetadata }>(
      "/src/assets/blog/**/hero.png",
    ),
  ).find(([k]) => k.includes(id));

  if (!hero_images) throw new Error(`No hero image found for ${id}.`);
  return hero_images[1];
}
