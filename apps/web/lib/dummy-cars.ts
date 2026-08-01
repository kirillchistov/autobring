export type DummyCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  priceRub: number;
  image: string;
  badge?: string;
  mileageKm?: number;
  engineCc?: number;
};

/** Demo inventory from RightBimmer content — local photos under /public/cars. */
export const DUMMY_CARS: DummyCar[] = [
  {
    id: "bmw-1-series-2020",
    brand: "BMW",
    model: "1-Series",
    year: 2020,
    priceRub: 1_120_000,
    image: "/cars/bmw-1-series-2020.jpg",
    badge: "Топ",
    mileageKm: 48000,
    engineCc: 1500,
  },
  {
    id: "bmw-2-series-2018",
    brand: "BMW",
    model: "2-Series",
    year: 2018,
    priceRub: 900_000,
    image: "/cars/bmw-2-series-2018.jpg",
    badge: "Популярное",
    mileageKm: 72000,
    engineCc: 2000,
  },
  {
    id: "bmw-x2-2018",
    brand: "BMW",
    model: "X2",
    year: 2018,
    priceRub: 1_650_000,
    image: "/cars/bmw-x2-2018.jpg",
    badge: "Популярное",
    mileageKm: 55000,
    engineCc: 2000,
  },
  {
    id: "toyota-raize-2021",
    brand: "Toyota",
    model: "Raize",
    year: 2021,
    priceRub: 1_600_000,
    image: "/cars/toyota-raize-2021.jpg",
    badge: "Спецпредложение",
    mileageKm: 32000,
    engineCc: 1000,
  },
  {
    id: "honda-fit-2022",
    brand: "Honda",
    model: "Fit",
    year: 2022,
    priceRub: 1_200_000,
    image: "/cars/honda-fit-2022.jpg",
    badge: "Новинка",
    mileageKm: 28000,
    engineCc: 1500,
  },
  {
    id: "suzuki-jimny-2021",
    brand: "Suzuki",
    model: "Jimny",
    year: 2021,
    priceRub: 1_600_000,
    image: "/cars/suzuki-jimny-2021.jpg",
    badge: "Новинка",
    mileageKm: 21000,
    engineCc: 1500,
  },
  {
    id: "mazda-axela-2017",
    brand: "Mazda",
    model: "Axela",
    year: 2017,
    priceRub: 1_000_000,
    image: "/cars/mazda-axela-2017.jpg",
    badge: "Спецпредложение",
    mileageKm: 89000,
    engineCc: 1500,
  },
  {
    id: "nissan-dayz-2021",
    brand: "Nissan",
    model: "Dayz",
    year: 2021,
    priceRub: 600_000,
    image: "/cars/nissan-dayz-2021.jpg",
    badge: "Бюджетный",
    mileageKm: 35000,
    engineCc: 660,
  },
];

export const HERO_IMAGE = "/cars/hero-bmw-x1.jpg";

export const STEPS = [
  {
    n: "01",
    title: "Подбор",
    body: "Оставляете заявку или выбираете лот — подбираем варианты по вашим критериям.",
  },
  {
    n: "02",
    title: "Проверка и покупка",
    body: "Проверяем историю и состояние, участвуем в японском аукционе от вашего имени.",
  },
  {
    n: "03",
    title: "Доставка под ключ",
    body: "Доставляем, растаможиваем и передаём автомобиль с документами.",
  },
] as const;

export const ADVANTAGES = [
  {
    title: "Прямые аукционы",
    body: "Доступ к закрытым японским аукционам без лишних посредников.",
  },
  {
    title: "Прозрачная цена",
    body: "Экономия до 40% по сравнению с покупкой у перекупщиков — с разбивкой под ключ.",
  },
  {
    title: "Тщательная проверка",
    body: "Подробный отчёт о состоянии автомобиля перед ставкой.",
  },
  {
    title: "Полный цикл",
    body: "Покупка, растаможка, доставка и постановка на учёт в одном процессе.",
  },
] as const;

export const DUMMY_CALC = {
  lotLabel: "BMW 1-Series 2020",
  lines: [
    { label: "Цена на аукционе", amount: "1 120 000 ₽" },
    { label: "Логистика до РФ", amount: "185 000 ₽" },
    { label: "Пошлина + утильсбор", amount: "310 000 ₽" },
    { label: "Услуги под ключ", amount: "95 000 ₽" },
  ],
  totalRub: "1 710 000 ₽",
  disclaimer:
    "Ориентировочный пример на демо-ставках. Не является финансовой или юридической консультацией.",
} as const;
