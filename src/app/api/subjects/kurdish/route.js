import { NextResponse } from "next/server";

export async function GET() {
  const kurdish = {
    id: 1,
    title: "kurdish",
    kurdish_title: "زمان و ئەدەبی کوردی",
    imageUrl: "kurdish.jpg",
    book: "https://drive.google.com/file/d/10uVFOkUN5ANtRyW1uyBhOBI0EtYEnDvQ/view",
    course1: {
      title: "م. سالم محمد کوردی پۆلی ١٢ ڕێزمان",
      lessons: [
        {
          id: 1,
          src: "https://www.youtube.com/embed/71Mcm7ejGMA",
          title: "بابەتی 1 - شێوازی ڕێژەی ڕاگەیاندن",
        },
        {
          id: 2,
          src: "https://www.youtube.com/embed/Jx3jqaHCnyw",
          title: "بابەتی 2 - شێوازی ڕێژەی دانانی",
        },
        {
          id: 3,
          src: "https://www.youtube.com/embed/dWyUYTXSV0E",
          title: "بابەتی 3 - شێوازی ڕێژەی داخوازی",
        },
        {
          id: 4,
          src: "https://www.youtube.com/embed/E6c6TxuEOgM",
          title: "بابەتی 4 - شێوازی ڕێژەی مەرجی",
        },
        {
          id: 5,
          src: "https://www.youtube.com/embed/jvJ10Icz_Ns",
          title: "بابەتی 5 - کاری چاوگی بوون",
        },
        {
          id: 6,
          src: "https://www.youtube.com/embed/Zln0P16z5wo",
          title: "بابەتی 6 - ئەرکی ( ە ) لە ڕێزمانی کوردیدا",
        },
        {
          id: 7,
          src: "https://www.youtube.com/embed/CUKzZdSvPE8",
          title: " بابەتی 7 - ئەرکی جێناوە کەسییە لکاوەکان وەک بکەر",
        },
        {
          id: 8,
          src: "https://www.youtube.com/embed/bSRqiI0zhHQ",
          title: "بابەتی 8 - ئەرکی جێناوە کەسییە لکاوەکان وەک بەرکار",
        },
        {
          id: 9,
          src: "https://www.youtube.com/embed/B8lkIAneMKs",
          title:
            "بابەتی 9 - ئەرکی جێناوە کەسییە لکاوەکان وەک تەواوکەری بەیاریدە",
        },
        {
          id: 10,
          src: "https://www.youtube.com/embed/_htrJnCZnWU",
          title: "بابەتی 10 - هاوەڵناو لە ڕووی ڕۆنانەوە",
        },
        {
          id: 11,
          src: "https://www.youtube.com/embed/prZ98JGzVjc",
          title: " بابەتی 11 - جۆرەکانی هاوەڵکار لە ڕووی پێکهاتنەوە",
        },
      ],
    },
  };

  return NextResponse.json(kurdish);
}
