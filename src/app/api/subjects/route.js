import { NextResponse } from "next/server";

const subjects = [
  {
    id: 1,
    title: "Kurdish",
    original_title: "زمان و ئەدەبی کوردی",
    route: "kurdish",
    imageUrl: "kurdish.jpg",
  },
  {
    id: 2,
    title: "Arabic Part 1",
    original_title: "  كتاب اللغة العربية  الجزء الأول",
    route: "arabic_part1",
    imageUrl: "arabic_part1.jpg",
  },
  {
    id: 3,
    title: "Arabic Part 2",
    original_title: "  كتاب اللغة العربية  الجزء الثاني",
    route: "arabic_part2",
    imageUrl: "arabic_part2.jpg",
  },
  {
    id: 4,
    title: "Sunrise 12",
    original_title: " Sunrise 12 ",
    route: "sunrise12",
    imageUrl: "sunrise12.jpg",
  },
  {
    id: 5,
    title: "Scientific Math",
    original_title: " بیرکاری بۆ هەموان - زانستی ",
    route: "scientific-math",
    imageUrl: "scientific_math.jpg",
  },
  {
    id: 6,
    title: "Biology",
    original_title: "زانست بۆ هەمووان - زیندەزانی ",
    route: "biology",
    imageUrl: "biology.jpg",
  },

  {
    id: 7,
    title: "Physics",
    original_title: "زانست بۆ هەمووان - فیزیا",
    route: "physics",
    imageUrl: "physics.jpg",
  },
  {
    id: 8,
    title: "Chemistry",
    original_title: "زانست بۆ هەمووان - کیمیا",
    route: "chemistry",
    imageUrl: "chemistry.jpg",
  },
  {
    id: 9,
    title: "Literary Math",
    original_title: "بیرکاری بۆ هەموان - ئەدەبی",
    route: "literary-math",
    imageUrl: "literary_math.jpg",
  },

  {
    id: 10,
    title: "Economic geography",
    original_title: " جوگرافیای ئێکۆنۆمی",
    route: "economic-geography",
    imageUrl: "economic_geography.jpg",
  },
  {
    id: 11,
    title: "History",
    original_title: "مێژووی نوێ و ‌هاوچەرخ",
    route: "history",
    imageUrl: "history.jpg",
  },
  {
    id: 12,
    title: "Economy",
    original_title: "ئابووری",
    route: "economy",
    imageUrl: "economy.jpg",
  },
];

export async function GET() {
  return NextResponse.json(subjects);
}
