import { asset } from "@/lib/asset";
import { HERO_IMAGE } from "@/lib/dummy-cars";

export function Hero() {
  return (
    <section className="relative min-h-[min(92svh,860px)] overflow-hidden bg-paper-100">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(HERO_IMAGE)}
          alt=""
          className="hero-photo h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper-50 via-paper-50/92 to-paper-50/25 md:via-paper-50/80 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper-50 via-transparent to-paper-50/40 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(92svh,860px)] max-w-6xl flex-col justify-center px-5 py-24 sm:px-6">
        <div className="max-w-xl">
          <p className="hero-enter hero-enter-delay-1 font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
            AutoBring
          </p>
          <h1 className="hero-enter hero-enter-delay-2 mt-5 text-2xl font-semibold leading-snug tracking-tight text-ink-900 sm:text-3xl md:text-[2.15rem] md:leading-snug">
            Автомобили из Японии напрямую с аукционов
          </h1>
          <p className="hero-enter hero-enter-delay-3 mt-4 max-w-md text-base leading-relaxed text-ink-600 sm:text-lg">
            Поможем купить, доставить и растаможить автомобиль из Японии под
            ключ — прозрачный расчёт и статус на каждом шаге.
          </p>
          <div className="hero-enter hero-enter-delay-4 mt-8 flex flex-wrap gap-3">
            <a
              href="#calc"
              className="rounded-lg bg-rust-500 px-5 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-rust-600"
            >
              Рассчитать стоимость
            </a>
            <a
              href="#catalog"
              className="rounded-lg border border-ink-900/10 bg-paper-50/80 px-5 py-3 text-sm font-semibold text-ink-800 backdrop-blur-sm transition-colors hover:border-ink-900/20 hover:bg-paper-50"
            >
              Смотреть каталог
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
