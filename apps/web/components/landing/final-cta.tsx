"use client";

export function FinalCta() {
  return (
    <section className="bg-paper-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="rounded-xl bg-ink-900 px-6 py-12 text-paper-50 sm:px-12 sm:py-14">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Готовы выбрать свой автомобиль из Японии?
          </h2>
          <p className="mt-3 max-w-md text-paper-300">
            Оставьте заявку — подберём лучшие варианты под ваш бюджет и задачи.
          </p>
          <form
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              aria-label="Ваше имя"
              className="h-11 flex-1 rounded-lg border-0 bg-paper-50 px-4 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-rust-300"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Ваш телефон"
              aria-label="Ваш телефон"
              className="h-11 flex-1 rounded-lg border-0 bg-paper-50 px-4 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-rust-300"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-rust-500 px-5 text-sm font-semibold text-paper-50 transition-colors hover:bg-rust-600"
            >
              Оставить заявку
            </button>
          </form>
          <p className="mt-3 text-xs text-paper-400">Демо-форма — отправка пока не подключена.</p>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-paper-200 bg-paper-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display text-base font-semibold text-ink-800">AutoBring</p>
        <p>Демо учебного проекта. Цены и ставки — ориентировочные.</p>
      </div>
    </footer>
  );
}
