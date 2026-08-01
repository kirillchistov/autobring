import { DUMMY_CALC } from "@/lib/dummy-cars";

export function CalcTeaser() {
  return (
    <section id="calc" className="scroll-mt-20 border-y border-paper-200 bg-paper-100 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
            Рассчитать стоимость
          </h2>
          <p className="mt-3 max-w-md text-ink-600">
            Пример разбивки «под ключ» для {DUMMY_CALC.lotLabel}. Интерактивный
            калькулятор появится вместе с каталогом.
          </p>
        </div>

        <div className="rounded-xl bg-paper-50 p-6 shadow-soft sm:p-8">
          <ul className="space-y-3.5">
            {DUMMY_CALC.lines.map((line) => (
              <li
                key={line.label}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span className="text-ink-500">{line.label}</span>
                <span className="font-medium text-ink-900">{line.amount}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-baseline justify-between border-t border-paper-200 pt-4">
            <span className="text-sm font-medium text-ink-600">Итого ориентир</span>
            <span className="text-xl font-semibold text-ink-900">{DUMMY_CALC.totalRub}</span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-500">{DUMMY_CALC.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
