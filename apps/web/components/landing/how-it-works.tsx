import { STEPS } from "@/lib/dummy-cars";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-paper-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
          Как мы работаем
        </h2>
        <p className="mt-2 max-w-lg text-ink-600">
          Три шага от заявки до автомобиля с документами.
        </p>
        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step) => (
            <li key={step.n} className="border-t border-paper-300 pt-5">
              <span className="text-xs font-semibold tracking-[0.14em] text-rust-500">
                {step.n}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
