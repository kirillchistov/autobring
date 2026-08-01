import { asset } from "@/lib/asset";
import { DUMMY_CARS } from "@/lib/dummy-cars";
import { formatMileage, formatRub } from "@/lib/format";

export function Showcase() {
  return (
    <section id="catalog" className="scroll-mt-20 bg-paper-100 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Популярные модели
            </h2>
            <p className="mt-2 max-w-lg text-ink-600">
              Демо-подборка с японских аукционов. Живой каталог появится в
              следующих спринтах.
            </p>
          </div>
          <p className="text-sm text-ink-500">{DUMMY_CARS.length} авто · демо</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DUMMY_CARS.map((car, index) => (
            <li
              key={car.id}
              className="fade-up group overflow-hidden rounded-xl bg-paper-50 shadow-soft"
              style={{ animationDelay: `${80 + index * 60}ms` }}
            >
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(car.image)}
                    alt={`${car.brand} ${car.model}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {car.badge ? (
                    <span className="absolute left-3 top-3 rounded-md bg-paper-50/95 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-700">
                      {car.badge}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col px-4 py-4">
                  <h3 className="text-[15px] font-semibold text-ink-900">
                    {car.year} {car.brand} {car.model}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    {[
                      car.mileageKm != null ? formatMileage(car.mileageKm) : null,
                      car.engineCc != null ? `${car.engineCc} см³` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-3 text-base font-semibold text-ink-900">
                    {formatRub(car.priceRub)}
                  </p>
                  <span className="mt-auto pt-3 text-xs font-medium text-rust-600">
                    Скоро · подробнее
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
