export type FeedCategory = "PHOTO" | "MAKEUP" | "MANICURE" | "VIDEO";

export const feedCategories: Array<{ id: FeedCategory; label: string }> = [
  { id: "PHOTO", label: "Фото" },
  { id: "MAKEUP", label: "Макіяж" },
  { id: "MANICURE", label: "Манікюр" },
  { id: "VIDEO", label: "Відео" },
];

export type HomePost = {
  id: string;
  type: "TFP" | "PROMO" | "GIVEAWAY" | "NEW_ITEM";
  category: FeedCategory;
  title: string;
  content: string;
  masterName: string;
  masterId: string;
  location: string;
  imageUrl: string;
  hot?: boolean;
};

export type BrandCard = {
  id: string;
  name: string;
  location: string;
  blurb: string;
  masterId: string;
  imageUrl: string;
};

const lens = "00000000-0000-4000-8000-000000000001";
const maria = "00000000-0000-4000-8000-000000000002";
const nude = "00000000-0000-4000-8000-000000000003";
const frame = "00000000-0000-4000-8000-000000000004";
const brows = "00000000-0000-4000-8000-000000000005";

function photo(id: number) {
  return `https://picsum.photos/id/${id}/960/720`;
}

export const topBrands: BrandCard[] = [
  {
    id: "brand-lens",
    name: "Студія Лінза",
    location: "Київ",
    blurb: "Зйомка, макіяж і догляд",
    masterId: lens,
    imageUrl: photo(1011),
  },
  {
    id: "brand-maria",
    name: "Марія Коваль",
    location: "Львів",
    blurb: "Колір, укладки, портрет",
    masterId: maria,
    imageUrl: photo(1027),
  },
  {
    id: "brand-nude",
    name: "Nude Room",
    location: "Одеса",
    blurb: "Манікюр і естетика рук",
    masterId: nude,
    imageUrl: photo(106),
  },
  {
    id: "brand-frame",
    name: "Frame Studio",
    location: "Київ",
    blurb: "Фото і вертикальне відео",
    masterId: frame,
    imageUrl: photo(1015),
  },
  {
    id: "brand-brows",
    name: "Brows Atelier",
    location: "Дніпро",
    blurb: "Брови і денний макіяж",
    masterId: brows,
    imageUrl: photo(1025),
  },
];

export const homePosts: HomePost[] = [
  {
    id: "hot-tfp-1",
    type: "TFP",
    category: "PHOTO",
    hot: true,
    title: "Зйомка вечірнього макіяжу",
    content: "Шукаю модель на творчу зйомку. Грим і укладка за фото.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
    imageUrl: photo(1016),
  },
  {
    id: "hot-tfp-2",
    type: "TFP",
    category: "MAKEUP",
    hot: true,
    title: "Творчий макіяж для серії",
    content: "TFP на холодний тон і графічні стрілки. Потрібен спокійний типаж.",
    masterName: "Марія Коваль",
    masterId: maria,
    location: "Львів",
    imageUrl: photo(1027),
  },
  {
    id: "hot-tfp-3",
    type: "TFP",
    category: "VIDEO",
    hot: true,
    title: "Вертикальне відео образу",
    content: "Знімаємо короткий fashion-ролик. Модель отримує кадри для портфоліо.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    imageUrl: photo(1074),
  },
  {
    id: "hot-tfp-4",
    type: "TFP",
    category: "MANICURE",
    hot: true,
    title: "Зйомка нігтів для портфоліо",
    content: "TFP на нюдове покриття і макро. Шукаю доглянуті руки.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    imageUrl: photo(1033),
  },
  {
    id: "promo-makeup",
    type: "PROMO",
    category: "MAKEUP",
    title: "Вечірній макіяж −15%",
    content: "Акція на збори до кінця тижня. Запис у будні після 16:00.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
    imageUrl: photo(996),
  },
  {
    id: "promo-nails",
    type: "PROMO",
    category: "MANICURE",
    title: "Манікюр тижня",
    content: "Зняття, форма і покриття за фіксованою ціною акції.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    imageUrl: photo(106),
  },
  {
    id: "promo-photo",
    type: "PROMO",
    category: "PHOTO",
    title: "Студійна година −20%",
    content: "Портрет у денному світлі. Два образи входять у акційну годину.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    imageUrl: photo(1015),
  },
  {
    id: "promo-video",
    type: "PROMO",
    category: "VIDEO",
    title: "Reels для майстра",
    content: "Три вертикальні ролики про послугу. Монтаж входить у ціну акції.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    imageUrl: photo(1003),
  },
  {
    id: "give-makeup",
    type: "GIVEAWAY",
    category: "MAKEUP",
    title: "Розіграш вечірнього макіяжу",
    content: "Один образ серед тих, хто збереже оголошення до неділі.",
    masterName: "Марія Коваль",
    masterId: maria,
    location: "Львів",
    imageUrl: photo(1011),
  },
  {
    id: "give-nails",
    type: "GIVEAWAY",
    category: "MANICURE",
    title: "Розіграш покриття",
    content: "Нюдовий манікюр для однієї підписки цього тижня.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    imageUrl: photo(1025),
  },
  {
    id: "new-photo",
    type: "NEW_ITEM",
    category: "PHOTO",
    title: "Нова локація для зйомки",
    content: "Відкрила світлу кімнату з вікном на захід. Перші слоти вже в календарі.",
    masterName: "Студія Лінза",
    masterId: lens,
    location: "Київ",
    imageUrl: photo(1033),
  },
  {
    id: "new-brows",
    type: "NEW_ITEM",
    category: "MAKEUP",
    title: "Ламінування брів",
    content: "Нова послуга: форма, догляд і натуральний вигин. Є вікна на цей місяць.",
    masterName: "Brows Atelier",
    masterId: brows,
    location: "Дніпро",
    imageUrl: photo(1074),
  },
  {
    id: "new-nails",
    type: "NEW_ITEM",
    category: "MANICURE",
    title: "Японський манікюр",
    content: "Додала догляд без покриття. Підійде, якщо хочеться блиску без гелю.",
    masterName: "Nude Room",
    masterId: nude,
    location: "Одеса",
    imageUrl: photo(1016),
  },
  {
    id: "tfp-video-2",
    type: "TFP",
    category: "VIDEO",
    title: "Fashion-відео на даху",
    content: "Шукаю модель на короткий ролик на заході сонця. Кадри віддаю обом.",
    masterName: "Frame Studio",
    masterId: frame,
    location: "Київ",
    imageUrl: photo(996),
  },
  {
    id: "tfp-photo-2",
    type: "TFP",
    category: "PHOTO",
    title: "Портрет для портфоліо",
    content: "ТФП для нового кольору волосся. Потрібен спокійний світлий типаж.",
    masterName: "Марія Коваль",
    masterId: maria,
    location: "Львів",
    imageUrl: photo(1003),
  },
  {
    id: "promo-brows",
    type: "PROMO",
    category: "MAKEUP",
    title: "Брови і денний макіяж",
    content: "Пара послуг за ціною одної в будні до обіду.",
    masterName: "Brows Atelier",
    masterId: brows,
    location: "Дніпро",
    imageUrl: photo(1027),
  },
];

export const hotTfpPosts = homePosts.filter((post) => post.hot && post.type === "TFP");

export const postTypeLabel = {
  TFP: "TFP",
  PROMO: "Акція",
  GIVEAWAY: "Розіграш",
  NEW_ITEM: "Новинка",
} as const;
