export type FeedPost = {
  id: string;
  type: "TFP" | "PROMO" | "GIVEAWAY" | "NEW_ITEM";
  title: string;
  content: string;
  masterName: string;
  masterId: string;
  location: string;
};

const masterId = "00000000-0000-4000-8000-000000000001";

export const samplePosts: FeedPost[] = [
  {
    id: "tfp-1",
    type: "TFP",
    title: "Зйомка вечірнього макіяжу",
    content: "Шукаю модель на творчу зйомку. Грим і укладка за фото.",
    masterName: "Студія Лінза",
    masterId,
    location: "Київ",
  },
  {
    id: "tfp-2",
    type: "TFP",
    title: "Портрет для портфоліо",
    content: "ТФП для нового кольору волосся. Потрібен спокійний світлий типаж.",
    masterName: "Марія Коваль",
    masterId,
    location: "Львів",
  },
  {
    id: "promo-1",
    type: "PROMO",
    title: "Догляд −20% цього тижня",
    content: "Кератин і відновлення кінчиків за фіксованою ціною акції.",
    masterName: "Студія Лінза",
    masterId,
    location: "Київ",
  },
  {
    id: "giveaway-1",
    type: "GIVEAWAY",
    title: "Розіграш укладки",
    content: "Один візит на укладку серед тих, хто зберіг цей пост.",
    masterName: "Марія Коваль",
    masterId,
    location: "Львів",
  },
  {
    id: "new-1",
    type: "NEW_ITEM",
    title: "Нова послуга: брови ламінування",
    content: "Додала ламінування брів. Перші записи відкриті на цей місяць.",
    masterName: "Студія Лінза",
    masterId,
    location: "Київ",
  },
];

export const carouselRails = [
  { type: "TFP" as const, title: "TFP", href: "/feed/tfp" },
  { type: "PROMO" as const, title: "Акції", href: null },
  { type: "GIVEAWAY" as const, title: "Розіграші", href: null },
  { type: "NEW_ITEM" as const, title: "Новинки", href: null },
];
