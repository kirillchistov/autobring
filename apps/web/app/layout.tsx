import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoBring — авто из Японии, Кореи и Китая",
  description:
    "Подбор, расчёт стоимости и отслеживание сделки при покупке автомобиля из Японии, Кореи или Китая.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
