export type FeedCategory = "PHOTO" | "MAKEUP" | "MANICURE" | "VIDEO";

export const feedCategories: Array<{ id: FeedCategory; label: string }> = [
  { id: "PHOTO", label: "Фото" },
  { id: "MAKEUP", label: "Макіяж" },
  { id: "MANICURE", label: "Манікюр" },
  { id: "VIDEO", label: "Відео" },
];

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

const lens = "00000000-0000-4000-8000-000000000001";
const maria = "00000000-0000-4000-8000-000000000002";
const nude = "00000000-0000-4000-8000-000000000003";
const frame = "00000000-0000-4000-8000-000000000004";

function photo(id: number) {
  return `https://picsum.photos/id/${id}/800/800`;
}

export const samplePosts: FeedPost[] = [
  {
    id: "tfp-1",
    type: "TFP",
    category: "MAKEUP",
    title: "Зйомка вечірнього макіяжу",
    content: "Шукаю модель на творчу зйомку. Грим і укладка за фото.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
  },
  {
    id: "tfp-2",
    type: "TFP",
    category: "PHOTO",
    title: "Портрет для портфоліо",
    content: "ТФП для нового кольору волосся. Потрібен спокійний світлий типаж.",
    masterName: "Марія Коваль",
    masterId: maria,
    location: "Львів",
  },
  {
    id: "tfp-3",
    type: "TFP",
    category: "MANICURE",
    title: "Макро для нігтів",
    content: "Шукаю руки для серії макро. Кадри віддаю в портфоліо.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    mediaUrl: photo(106),
    mediaKind: "image",
  },
  {
    id: "tfp-4",
    type: "TFP",
    category: "VIDEO",
    title: "Короткий fashion-ролик",
    content: "TFP на вертикальне відео. Модель отримує монтаж.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    mediaKind: "video",
  },
  {
    id: "promo-1",
    type: "PROMO",
    category: "MAKEUP",
    title: "Догляд −20% цього тижня",
    content: "Кератин і відновлення кінчиків за фіксованою ціною акції.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
  },
  {
    id: "promo-2",
    type: "PROMO",
    category: "MAKEUP",
    title: "Вечірній макіяж −15%",
    content: "Акція на збори у будні після 16:00.",
    masterName: "Марія Коваль",
    masterId: maria,
    location: "Львів",
    mediaUrl: photo(1027),
    mediaKind: "image",
  },
  {
    id: "promo-3",
    type: "PROMO",
    category: "MANICURE",
    title: "Манікюр тижня",
    content: "Зняття, форма і покриття за фіксованою ціною.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    mediaUrl: photo(1033),
    mediaKind: "image",
  },
  {
    id: "promo-4",
    type: "PROMO",
    category: "PHOTO",
    title: "Студійна година −20%",
    content: "Портрет у денному світлі, два образи в акційній годині.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
  },
  {
    id: "giveaway-1",
    type: "GIVEAWAY",
    category: "MAKEUP",
    title: "Розіграш укладки",
    content: "Один візит на укладку серед тих, хто зберіг цей пост.",
    masterName: "Марія Коваль",
    masterId: maria,
    location: "Львів",
  },
  {
    id: "giveaway-2",
    type: "GIVEAWAY",
    category: "MANICURE",
    title: "Розіграш покриття",
    content: "Нюдовий манікюр для однієї людини цього тижня.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    mediaUrl: photo(1025),
    mediaKind: "image",
  },
  {
    id: "giveaway-3",
    type: "GIVEAWAY",
    category: "PHOTO",
    title: "Розіграш портрета",
    content: "Одна студійна година серед підписників.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    mediaUrl: photo(1015),
    mediaKind: "image",
  },
  {
    id: "giveaway-4",
    type: "GIVEAWAY",
    category: "MAKEUP",
    title: "Розіграш денного макіяжу",
    content: "Один образ у будень до обіду.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
  },
  {
    id: "new-1",
    type: "NEW_ITEM",
    category: "MAKEUP",
    title: "Нова послуга: брови ламінування",
    content: "Додала ламінування брів. Перші записи відкриті на цей місяць.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
  },
  {
    id: "new-2",
    type: "NEW_ITEM",
    category: "PHOTO",
    title: "Нова локація для зйомки",
    content: "Світла кімната з вікном на захід. Перші слоти вже в календарі.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
    mediaUrl: photo(1011),
    mediaKind: "image",
  },
  {
    id: "new-3",
    type: "NEW_ITEM",
    category: "MANICURE",
    title: "Японський манікюр",
    content: "Догляд без покриття, якщо хочеться блиску без гелю.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
  },
  {
    id: "new-4",
    type: "NEW_ITEM",
    category: "VIDEO",
    title: "Вертикальне відео послуги",
    content: "Знімаю короткий ролик про візит: до, процес і результат.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    mediaKind: "video",
  },
];

export const carouselRails = [
  { type: "TFP" as const, title: "TFP", href: "/feed/tfp" },
  { type: "PROMO" as const, title: "Акції", href: null },
  { type: "GIVEAWAY" as const, title: "Розіграші", href: null },
  { type: "NEW_ITEM" as const, title: "Новинки", href: null },
];
