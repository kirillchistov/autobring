export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper-50 text-ink-800">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-3 text-sm uppercase tracking-wide text-rust-600">
          Sprint 0 scaffold
        </p>
        <h1 className="font-display text-5xl font-semibold text-ink-900">
          AutoBring
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-600">
          Один расчёт, одна панель, три страны: подбирайте, сравнивайте и
          отслеживайте свой автомобиль из Японии, Кореи или Китая.
        </p>
        <div className="mt-10 flex gap-3">
          <span className="rounded-lg bg-rust-500 px-4 py-2 text-sm font-medium text-paper-50">
            Каталог (Module 1+)
          </span>
          <span className="rounded-lg border border-paper-300 px-4 py-2 text-sm font-medium text-ink-700">
            Калькулятор (Module 2+)
          </span>
        </div>
      </section>
    </main>
  );
}
