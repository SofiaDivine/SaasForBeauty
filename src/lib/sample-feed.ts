export type FeedCategory =
  | "PHOTO"
  | "MAKEUP"
  | "MANICURE"
  | "VIDEO"
  | "FASHION"
  | "HAIR"
  | "PETS"
  | "CAFE"
  | "CRAFT";

export type FeedArea = "BEAUTY" | "SHOOT" | "OTHER";

export const feedCategories: Array<{ id: FeedCategory; label: string }> = [
  { id: "PHOTO", label: "Фото" },
  { id: "MAKEUP", label: "Макіяж" },
  { id: "MANICURE", label: "Манікюр" },
  { id: "VIDEO", label: "Відео" },
];

export const feedAreas: Array<{ id: FeedArea; label: string; hint: string }> = [
  {
    id: "BEAUTY",
    label: "Краса та мода",
    hint: "Б'юті-послуги та бренди одягу",
  },
  {
    id: "SHOOT",
    label: "Зйомка",
    hint: "Фотографи та відеографи",
  },
  {
    id: "OTHER",
    label: "Інше",
    hint: "Тварини, заклади та рукоділля",
  },
];

const areaByCategory: Record<FeedCategory, FeedArea> = {
  PHOTO: "SHOOT",
  VIDEO: "SHOOT",
  MAKEUP: "BEAUTY",
  MANICURE: "BEAUTY",
  FASHION: "BEAUTY",
  HAIR: "BEAUTY",
  PETS: "OTHER",
  CAFE: "OTHER",
  CRAFT: "OTHER",
};

export function areaOf(category: FeedCategory): FeedArea {
  return areaByCategory[category];
}

export type FeedPost = {
  id: string;
  type: "TFP" | "PROMO" | "GIVEAWAY" | "NEW_ITEM";
  category: FeedCategory;
  title: string;
  content: string;
  masterName: string;
  masterId: string;
  location: string;
  mediaUrl?: string;
  mediaKind?: "image" | "video";
};

export const nicheLabel: Record<FeedCategory, string> = {
  PHOTO: "Фотограф",
  MAKEUP: "Візажист",
  MANICURE: "Манікюр",
  VIDEO: "Відеограф",
  FASHION: "Бренд одягу",
  HAIR: "Колорист",
  PETS: "Грумінг",
  CAFE: "Кав'ярня",
  CRAFT: "Рукоділля",
};

export function mediaKindOf(url: string): "image" | "video" {
  const path = url.split(/[?#]/)[0] ?? url;
  return /\.(mp4|webm|mov|m4v|ogv)$/i.test(path) ? "video" : "image";
}

export const carouselRails = [
  { type: "TFP" as const, title: "TFP", href: "/feed/tfp" },
  { type: "PROMO" as const, title: "Акції", href: null },
  { type: "GIVEAWAY" as const, title: "Розіграші", href: null },
  { type: "NEW_ITEM" as const, title: "Новинки", href: null },
];
