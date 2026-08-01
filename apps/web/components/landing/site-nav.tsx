export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-paper-200/80 bg-paper-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#top" className="font-display text-xl font-semibold tracking-tight text-ink-900">
          AutoBring
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-600 md:flex">
          <a href="#how" className="transition-colors hover:text-ink-900">
            Как это работает
          </a>
          <a href="#catalog" className="transition-colors hover:text-ink-900">
            Каталог
          </a>
          <a href="#why" className="transition-colors hover:text-ink-900">
            Преимущества
          </a>
          <a href="#calc" className="transition-colors hover:text-ink-900">
            Расчёт
          </a>
        </nav>
        <a
          href="#catalog"
          className="rounded-lg bg-rust-500 px-3.5 py-2 text-sm font-semibold text-paper-50 transition-colors hover:bg-rust-600"
        >
          Смотреть авто
        </a>
      </div>
    </header>
  );
}
