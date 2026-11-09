import type { GridLayout, ProfileType } from "@prisma/client";
import {
  mediaKindOf,
  type FeedCategory,
  type FeedPost,
} from "@/lib/sample-feed";

export type CatalogService = {
  id: string;
  title: string;
  durationMinutes: number;
  price: string;
  isTfp: boolean;
};

export type CatalogPost = {
  id: string;
  type: FeedPost["type"];
  title: string;
  content: string;
  mediaUrls: string[];
};

export type CatalogMaster = {
  profileId: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  instagram: string;
  location: string;
  niche: FeedCategory;
  profileType: ProfileType;
  gridLayout: GridLayout;
  services: CatalogService[];
  posts: CatalogPost[];
};

function shot(id: string, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

const fashionReel =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/dd/Amsterdam_Fashion_Week_-_Aftermovie.webm/Amsterdam_Fashion_Week_-_Aftermovie.webm.480p.vp9.webm";
const latteClip = "https://upload.wikimedia.org/wikipedia/commons/7/7e/Latte_Coffee_making.webm";
const groomingClip =
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Dog_Grooming_Alverno_Student.webmhd.webm";
const coupleAtHome =
  "https://upload.wikimedia.org/wikipedia/commons/7/7e/Attractive_young_couple_taking_selfie_portrait_with_smart_mobile_on_the_bed.jpg";
const photoStudio =
  "https://upload.wikimedia.org/wikipedia/commons/d/d8/Union_206_Photography_Studio_-_Stierch.jpg";
const cameraOperator =
  "https://upload.wikimedia.org/wikipedia/commons/8/81/2016_Operator_kamery_w_czasie_pracy.JPG";
const frenchNails = "https://upload.wikimedia.org/wikipedia/commons/8/80/Manicure_closeup.jpg";
const maternityPortrait =
  "https://upload.wikimedia.org/wikipedia/commons/d/df/Pregnant_Woman_Sitting_Barefoot_on_Porch_Steps.jpg";
const bridalLook = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bengali_Bride.jpg";
const bridalVeil =
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/Wedding%2C_bride_Fortepan_1508.jpg";

export const masters: CatalogMaster[] = [
  {
    profileId: "00000000-0000-4000-8000-000000000001",
    userId: "00000000-0000-4000-8000-000000000101",
    name: "Студія Лінза",
    email: "linza@tfp-bundle.test",
    avatarUrl: shot("1493863641943-9b68992a8d07", 400),
    bio: "Студійний і вуличний портрет. Осінь, вагітність і пари — лише зйомка, без гриму.",
    instagram: "https://instagram.com/linza.studio",
    location: "Київ",
    niche: "PHOTO",
    profileType: "STUDIO",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001101", title: "Портретна година", durationMinutes: 90, price: "2500", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001102", title: "Зйомка для вагітних", durationMinutes: 90, price: "3200", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001103", title: "TFP-зйомка", durationMinutes: 120, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002001",
        type: "TFP",
        title: "Студійний портрет",
        content: "Шукаю спокійний типаж на портрет у денному світлі. Кадри віддаю обом.",
        mediaUrls: [shot("1534528741775-53994a69daeb"), shot("1531746020798-e6953c6e8e04")],
      },
      {
        id: "00000000-0000-4000-8000-000000002002",
        type: "TFP",
        title: "Творча осіння зйомка",
        content: "Пальто і тепле світло. Шукаю модель на серію з осіннім кольором.",
        mediaUrls: [shot("1539533018447-63fcce2678e3"), shot("1477414348463-c0eb7f1359b6")],
      },
      {
        id: "00000000-0000-4000-8000-000000002003",
        type: "TFP",
        title: "Зйомка для вагітних",
        content: "Портрет вагітної на ганку і окремий кадр живота. Образ готуєте свій, я знімаю і ретушую.",
        mediaUrls: [maternityPortrait, shot("1493894473891-10fc1e5dbd22")],
      },
      {
        id: "00000000-0000-4000-8000-000000002004",
        type: "TFP",
        title: "Зйомка для сімейних пар",
        content: "Домашня серія для двох. Кадри отримують обоє.",
        mediaUrls: [coupleAtHome],
      },
      {
        id: "00000000-0000-4000-8000-000000002005",
        type: "PROMO",
        title: "Студійна година −20%",
        content: "Година в студії з циклорамою. Два образи входять у акційну годину.",
        mediaUrls: [photoStudio, shot("1534528741775-53994a69daeb")],
      },
      {
        id: "00000000-0000-4000-8000-000000002006",
        type: "GIVEAWAY",
        title: "Розіграш осінньої зйомки",
        content: "Одна осіння година серед тих, хто збереже оголошення до неділі.",
        mediaUrls: [shot("1539533018447-63fcce2678e3")],
      },
      {
        id: "00000000-0000-4000-8000-000000002007",
        type: "NEW_ITEM",
        title: "Нова локація для зйомки",
        content: "Світла студія з циклорамою. Перші слоти вже в календарі.",
        mediaUrls: [photoStudio],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000002",
    userId: "00000000-0000-4000-8000-000000000102",
    name: "Марія Коваль",
    email: "maria@tfp-bundle.test",
    avatarUrl: shot("1487412947147-5cebf100ffc2", 400),
    bio: "Вечірній і творчий макіяж. Не знімаю і не фарбую волосся.",
    instagram: "https://instagram.com/maria.koval.mua",
    location: "Львів",
    niche: "MAKEUP",
    profileType: "INDIVIDUAL",
    gridLayout: "THREADS_FEED",
    services: [
      { id: "00000000-0000-4000-8000-000000001201", title: "Вечірній макіяж", durationMinutes: 90, price: "1800", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001202", title: "Творчий макіяж", durationMinutes: 90, price: "1600", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001203", title: "TFP-макіяж", durationMinutes: 90, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002101",
        type: "TFP",
        title: "Творчий макіяж для серії",
        content: "Холодний тон і графічні стрілки. Шукаю спокійний типаж, фото робить окремий фотограф.",
        mediaUrls: [shot("1616683693504-3ea7e9ad6fec"), shot("1522335789203-aabd1fc54bc9")],
      },
      {
        id: "00000000-0000-4000-8000-000000002102",
        type: "PROMO",
        title: "Вечірній макіяж −15%",
        content: "Акція на збори у будні після 16:00. Укладку не роблю.",
        mediaUrls: [shot("1487412947147-5cebf100ffc2"), shot("1512496015851-a90fb38ba796")],
      },
      {
        id: "00000000-0000-4000-8000-000000002103",
        type: "GIVEAWAY",
        title: "Розіграш денного макіяжу",
        content: "Один образ у будень до обіду серед тих, хто збереже оголошення.",
        mediaUrls: [shot("1596462502278-27bfdc403348")],
      },
      {
        id: "00000000-0000-4000-8000-000000002104",
        type: "NEW_ITEM",
        title: "Графічні стрілки",
        content: "Додала схему денного макіяжу з тонкою стрілкою. Є вікна на цей місяць.",
        mediaUrls: [shot("1516975080664-ed2fc6a32937"), shot("1631214524020-7e18db9a8f92")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000006",
    userId: "00000000-0000-4000-8000-000000000106",
    name: "Ательє Вуаль",
    email: "vual@tfp-bundle.test",
    avatarUrl: bridalLook,
    bio: "Лише весільний макіяж: проба образу і збори нареченої.",
    instagram: "https://instagram.com/vual.bridal",
    location: "Київ",
    niche: "MAKEUP",
    profileType: "STUDIO",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001301", title: "Весільний макіяж", durationMinutes: 150, price: "3800", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001302", title: "Проба весільного образу", durationMinutes: 90, price: "1600", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001303", title: "TFP-проба", durationMinutes: 90, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002201",
        type: "TFP",
        title: "Проба весільного макіяжу",
        content: "Шукаю наречену на пробний образ: очі, прикраси і зібране волосся. Фото робить фотограф пари.",
        mediaUrls: [bridalLook],
      },
      {
        id: "00000000-0000-4000-8000-000000002202",
        type: "PROMO",
        title: "Проба образу з фатою −15%",
        content: "Класична фата і зібране волосся. Макіяж проби в будні, образ можна перенести на дату свята.",
        mediaUrls: [bridalVeil],
      },
      {
        id: "00000000-0000-4000-8000-000000002203",
        type: "GIVEAWAY",
        title: "Розіграш пробного образу",
        content: "Одна проба весільного макіяжу очей серед тих, хто збереже оголошення.",
        mediaUrls: [shot("1487412947147-5cebf100ffc2")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000003",
    userId: "00000000-0000-4000-8000-000000000103",
    name: "Nude Room",
    email: "nude@tfp-bundle.test",
    avatarUrl: shot("1604654894610-df63bc536371", 400),
    bio: "Манікюр і макро нігтів. Інших послуг немає.",
    instagram: "https://instagram.com/nude.room",
    location: "Одеса",
    niche: "MANICURE",
    profileType: "STUDIO",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001401", title: "Манікюр з покриттям", durationMinutes: 75, price: "800", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001402", title: "Весільний манікюр", durationMinutes: 90, price: "1100", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001403", title: "TFP-макро нігтів", durationMinutes: 45, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002301",
        type: "TFP",
        title: "Макро для нігтів",
        content: "Шукаю руки для серії макро. Кадри віддаю в портфоліо, покриття за фото.",
        mediaUrls: [shot("1604654894610-df63bc536371"), shot("1632345031435-8727f6897d53")],
      },
      {
        id: "00000000-0000-4000-8000-000000002302",
        type: "TFP",
        title: "Макро весільних нігтів",
        content: "Шукаю руки на серію нюдового френча. Покриття за кадри для портфоліо.",
        mediaUrls: [shot("1610992015732-2449b76344bc")],
      },
      {
        id: "00000000-0000-4000-8000-000000002303",
        type: "PROMO",
        title: "Манікюр тижня",
        content: "Зняття, форма і покриття за фіксованою ціною.",
        mediaUrls: [shot("1519014816548-bf5fe059798b")],
      },
      {
        id: "00000000-0000-4000-8000-000000002304",
        type: "PROMO",
        title: "Весільний манікюр −20%",
        content: "Прозорий френч і догляд кутикули для пробного образу цього місяця.",
        mediaUrls: [frenchNails],
      },
      {
        id: "00000000-0000-4000-8000-000000002305",
        type: "GIVEAWAY",
        title: "Розіграш покриття",
        content: "Нюдовий манікюр для однієї людини цього тижня.",
        mediaUrls: [shot("1604654894610-df63bc536371")],
      },
      {
        id: "00000000-0000-4000-8000-000000002306",
        type: "NEW_ITEM",
        title: "Японський манікюр",
        content: "Догляд без покриття, якщо хочеться блиску без гелю.",
        mediaUrls: [frenchNails],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000004",
    userId: "00000000-0000-4000-8000-000000000104",
    name: "Frame Studio",
    email: "frame@tfp-bundle.test",
    avatarUrl: cameraOperator,
    bio: "Відеограф: вертикальні ролики послуг і короткі fashion-фільми. Фото не знімаю.",
    instagram: "https://instagram.com/frame.studio",
    location: "Київ",
    niche: "VIDEO",
    profileType: "STUDIO",
    gridLayout: "THREADS_FEED",
    services: [
      { id: "00000000-0000-4000-8000-000000001501", title: "Вертикальний ролик", durationMinutes: 60, price: "2200", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001502", title: "Fashion-ролик", durationMinutes: 120, price: "3500", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001503", title: "TFP-відео", durationMinutes: 90, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002401",
        type: "TFP",
        title: "Оператор на локації",
        content: "Знімаю процес на камеру і віддаю монтаж. У кадрі робота оператора, не макіяж.",
        mediaUrls: [cameraOperator],
      },
      {
        id: "00000000-0000-4000-8000-000000002402",
        type: "TFP",
        title: "Fashion-ролик для бренду",
        content: "Короткий ролик з показу: хода, тканини, світло. Модель отримує монтаж.",
        mediaUrls: [fashionReel],
      },
      {
        id: "00000000-0000-4000-8000-000000002403",
        type: "PROMO",
        title: "Монтаж ролика −20%",
        content: "Один вертикальний ролик. Зйомка камерою і монтаж входять у ціну акції.",
        mediaUrls: [shot("1516035069371-29a1b244cc32")],
      },
      {
        id: "00000000-0000-4000-8000-000000002404",
        type: "GIVEAWAY",
        title: "Розіграш короткого ролика",
        content: "Один вертикальний ролик серед тих, хто збереже пост.",
        mediaUrls: [cameraOperator],
      },
      {
        id: "00000000-0000-4000-8000-000000002405",
        type: "NEW_ITEM",
        title: "Нова камера для вертикального відео",
        content: "Знімаю короткі ролики на відеокамеру. Перші слоти вже відкриті.",
        mediaUrls: [cameraOperator, shot("1516035069371-29a1b244cc32")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000007",
    userId: "00000000-0000-4000-8000-000000000107",
    name: "Linen Atelier",
    email: "linen@tfp-bundle.test",
    avatarUrl: shot("1445205170230-053b83016050", 400),
    bio: "Локальний бренд одягу: жакети і сукні. Шукаємо бартер на лукбук, не знімаємо інших.",
    instagram: "https://instagram.com/linen.atelier",
    location: "Київ",
    niche: "FASHION",
    profileType: "STUDIO",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001601", title: "Примірка колекції", durationMinutes: 40, price: "500", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001602", title: "Лукбук TFP", durationMinutes: 180, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002501",
        type: "TFP",
        title: "Новий бренд одягу шукає бартер",
        content: "Відкрили шоурум і шукаємо моделей на лукбук. Одяг залишається вам за зйомку.",
        mediaUrls: [shot("1490481651871-ab68de25d43d"), shot("1515886657613-9f3515b0c78f")],
      },
      {
        id: "00000000-0000-4000-8000-000000002502",
        type: "PROMO",
        title: "Примірка нової колекції",
        content: "Перші покупці шоуруму: −10% на жакет, якщо приходите цього тижня.",
        mediaUrls: [shot("1515886657613-9f3515b0c78f"), shot("1529626455594-4ff0802cfb7e")],
      },
      {
        id: "00000000-0000-4000-8000-000000002503",
        type: "NEW_ITEM",
        title: "Шоурум локального бренду",
        content: "Жакети і сукні вже на рейлах. Є слоти на примірку і бартерні зйомки.",
        mediaUrls: [shot("1445205170230-053b83016050"), shot("1489987707025-afc232f7ea0f")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000011",
    userId: "00000000-0000-4000-8000-000000000111",
    name: "Колір Студія",
    email: "kolir@tfp-bundle.test",
    avatarUrl: shot("1562322140-8baeececf3df", 400),
    bio: "Колір і догляд за волоссям. Макіяж і зйомку не робимо.",
    instagram: "https://instagram.com/kolir.studio",
    location: "Дніпро",
    niche: "HAIR",
    profileType: "STUDIO",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001701", title: "Фарбування", durationMinutes: 150, price: "2400", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001702", title: "Догляд", durationMinutes: 60, price: "900", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001703", title: "Укладка", durationMinutes: 45, price: "700", isTfp: false },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002601",
        type: "PROMO",
        title: "Догляд −20% цього тижня",
        content: "Кератин і відновлення кінчиків за фіксованою ціною акції.",
        mediaUrls: [shot("1560066984-138dadb4c035")],
      },
      {
        id: "00000000-0000-4000-8000-000000002602",
        type: "PROMO",
        title: "Холодний блонд",
        content: "Фарбування в холодний тон у будні до обіду дешевше.",
        mediaUrls: [shot("1487412720507-e7ab37603c6f"), shot("1500917293891-ef795e70e1f6")],
      },
      {
        id: "00000000-0000-4000-8000-000000002603",
        type: "GIVEAWAY",
        title: "Розіграш укладки",
        content: "Один візит на укладку серед тих, хто зберіг цей пост.",
        mediaUrls: [shot("1562322140-8baeececf3df")],
      },
      {
        id: "00000000-0000-4000-8000-000000002604",
        type: "NEW_ITEM",
        title: "Балаяж",
        content: "Нова техніка м'якого переходу кольору. Перші записи відкриті на цей місяць.",
        mediaUrls: [shot("1500917293891-ef795e70e1f6")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000008",
    userId: "00000000-0000-4000-8000-000000000108",
    name: "Лапа & Бант",
    email: "lapa@tfp-bundle.test",
    avatarUrl: shot("1517849845537-4d257902454a", 400),
    bio: "Грумінг собак на новій локації. Працюємо за візит або за відмітку.",
    instagram: "https://instagram.com/lapa.bant",
    location: "Харків",
    niche: "PETS",
    profileType: "STUDIO",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001801", title: "Грумінг малої породи", durationMinutes: 60, price: "700", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001802", title: "Грумінг середньої породи", durationMinutes: 90, price: "1100", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001803", title: "Грумінг за відмітку", durationMinutes: 60, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002701",
        type: "TFP",
        title: "Грумінг за відмітку",
        content: "Нова локація: шукаю собак малих порід. Стрижка за відмітку і кілька фото.",
        mediaUrls: [groomingClip, shot("1583511655857-d19b40a7a54e")],
      },
      {
        id: "00000000-0000-4000-8000-000000002702",
        type: "GIVEAWAY",
        title: "Розіграш грумінгу",
        content: "Одна стрижка для собаки малої породи серед відміток на нову локацію.",
        mediaUrls: [shot("1517849845537-4d257902454a")],
      },
      {
        id: "00000000-0000-4000-8000-000000002703",
        type: "NEW_ITEM",
        title: "Грумінг на новій локації",
        content: "Відкрили кабінет біля парку. Є вікна на стрижку і фото після візиту.",
        mediaUrls: [shot("1587300003388-59208cc962cb"), shot("1548199973-03cce0bbc87b")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000009",
    userId: "00000000-0000-4000-8000-000000000109",
    name: "Чорна філіжанка",
    email: "filizhanka@tfp-bundle.test",
    avatarUrl: shot("1495474472287-4d71bcdd2085", 400),
    bio: "Нова кав'ярня. Кава і десерти, без б'юті-послуг.",
    instagram: "https://instagram.com/chorna.filizhanka",
    location: "Вінниця",
    niche: "CAFE",
    profileType: "STUDIO",
    gridLayout: "THREADS_FEED",
    services: [
      { id: "00000000-0000-4000-8000-000000001901", title: "Дегустація десертів", durationMinutes: 40, price: "280", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001902", title: "Лате-сет", durationMinutes: 30, price: "180", isTfp: false },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002801",
        type: "PROMO",
        title: "Нові десерти в кав'ярні",
        content: "Відкрились цього місяця. Осіннє меню: груша, гарбуз і какао. Дегустаційний сет дешевше.",
        mediaUrls: [shot("1488477181946-6428a0291777"), shot("1578985545062-69928b1d9587")],
      },
      {
        id: "00000000-0000-4000-8000-000000002802",
        type: "NEW_ITEM",
        title: "Лате на новій каві",
        content: "Поставили нову еспресо-машину. Перший тиждень лате за ціною еспресо.",
        mediaUrls: [latteClip, shot("1509042239860-f550ce710b93")],
      },
      {
        id: "00000000-0000-4000-8000-000000002803",
        type: "NEW_ITEM",
        title: "Кав'ярня відкрила залу",
        content: "Нова вітрина десертів і ранкова кава. Перший тиждень — дегустація за записом.",
        mediaUrls: [shot("1554118811-1e0d58224f24"), shot("1551024601-bec78aea704b")],
      },
      {
        id: "00000000-0000-4000-8000-000000002804",
        type: "GIVEAWAY",
        title: "Розіграш десертного сету",
        content: "Один осінній сет серед тих, хто збереже оголошення кав'ярні.",
        mediaUrls: [shot("1563805042-7684c019e1cb")],
      },
    ],
  },
  {
    profileId: "00000000-0000-4000-8000-000000000010",
    userId: "00000000-0000-4000-8000-000000000110",
    name: "Нитка",
    email: "nytka@tfp-bundle.test",
    avatarUrl: shot("1515562141207-7a88fb7ce338", 400),
    bio: "Прикраси ручної роботи: сережки, кільця і кераміка.",
    instagram: "https://instagram.com/nytka.craft",
    location: "Івано-Франківськ",
    niche: "CRAFT",
    profileType: "INDIVIDUAL",
    gridLayout: "INSTAGRAM_GRID",
    services: [
      { id: "00000000-0000-4000-8000-000000001a01", title: "Майстер-клас", durationMinutes: 120, price: "700", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001a02", title: "Замовлення сережок", durationMinutes: 30, price: "900", isTfp: false },
      { id: "00000000-0000-4000-8000-000000001a03", title: "Виріб за кадри", durationMinutes: 60, price: "0", isTfp: true },
    ],
    posts: [
      {
        id: "00000000-0000-4000-8000-000000002901",
        type: "TFP",
        title: "Зйомка прикрас за виріб",
        content: "Шукаю модель з коротким волоссям. Сережки залишаються вам за кадри для магазину.",
        mediaUrls: [shot("1535632066927-ab7c9ab60908"), shot("1515562141207-7a88fb7ce338")],
      },
      {
        id: "00000000-0000-4000-8000-000000002902",
        type: "NEW_ITEM",
        title: "Рукоділля: кераміка",
        content: "Нова партія ваз і чашок ручної роботи. Можна забрати в майстерні.",
        mediaUrls: [shot("1565193566173-7a0ee3dbe261"), shot("1610701596007-11502861dcfa")],
      },
      {
        id: "00000000-0000-4000-8000-000000002903",
        type: "PROMO",
        title: "Кільце цього тижня",
        content: "Тонке кільце ручної роботи дешевше, якщо забираєте до неділі.",
        mediaUrls: [shot("1611591437281-460bfbe1220a")],
      },
    ],
  },
];

export function masterById(id: string) {
  return masters.find((master) => master.profileId === id) ?? null;
}

export const catalogPosts: FeedPost[] = masters.flatMap((master) =>
  master.posts.map((post) => {
    const mediaUrl = post.mediaUrls[0];
    return {
      id: post.id,
      type: post.type,
      category: master.niche,
      title: post.title,
      content: post.content,
      masterName: master.name,
      masterId: master.profileId,
      location: master.location,
      mediaUrl,
      mediaKind: mediaUrl ? mediaKindOf(mediaUrl) : undefined,
    };
  }),
);
