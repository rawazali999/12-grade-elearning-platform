import { NextResponse } from "next/server";

export async function GET() {
  const sunrise12 = {
    id: 4,
    title: "sunrise12",
    original_title: " Sunrise 12 ",
    imageUrl: "sunrise12.jpg",
    book: "https://drive.google.com/file/d/1Z7XCRXeh6CGT2z8BeuMDUCptQA7fcS7z/view",
    course1: {
      id: 12345,
      kurdish_title: "بیرکاری پۆلی12ی زانستی | م. وەرزێر حەسەن (هەرێم) ",
      lessons: [
        {
          id: 1,
          src: "https://www.youtube.com/embed/LHwmUklujrI",
          title: "بەشی 1 وانەی 2-1",
          checked: false,
        },
        {
          id: 2,
          src: "https://www.youtube.com/embed/Wy_f_OQLB20",
          title: "بەشی 1 وانەی 3 ",
          checked: false,
        },
        {
          id: 3,
          src: "https://www.youtube.com/embed/dWyUYTXSV0E",
          title: "بابه‌تی لایڤ به‌شی یه‌كه‌م",
          checked: false,
        },
        {
          id: 4,
          src: "https://www.youtube.com/embed/0xEd0315310",
          title: "بەشی 2 وانەی 1 ",
          checked: false,
        },
      ],
    },
  };

  return NextResponse.json(sunrise12);
}
