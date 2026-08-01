import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoBring — автомобили из Японии с аукционов",
  description:
    "Поможем купить, доставить и растаможить автомобиль из Японии под ключ. Прозрачный расчёт и статус сделки.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
