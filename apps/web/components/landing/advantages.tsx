import { ADVANTAGES } from "@/lib/dummy-cars";

export function Advantages() {
  return (
    <section id="why" className="scroll-mt-20 bg-paper-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
          Почему выбирают нас
        </h2>
        <p className="mt-2 max-w-lg text-ink-600">
          Прозрачный процесс вместо звонков ради каждой цифры.
        </p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((item) => (
            <li key={item.title}>
              <div className="mb-3 h-1 w-8 bg-rust-500" />
              <h3 className="text-base font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
