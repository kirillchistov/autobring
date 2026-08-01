# AutoBring — учебный монорепозиторий

Сборка учебного проекта по курсу «Продвинутый React на практике» (см.
[План реализации](./docs/implementation-plan.md) и [Программа курса](./docs/course-curriculum.md).

## Структура

```
apps/
  web/    Next.js 15 (App Router), React 19
  api/    Express + Prisma + PostgreSQL
packages/
  shared-types/       общие TS-типы Car, Deal, User, PriceCalculation...
  calculator-rates/   версионируемые ставки пошлины/утильсбора + чистая функция расчёта
  mock-data/          сгенерированный синтетический датасет (cars.json)
scripts/
  generate-dataset.mjs  генератор синтетических карточек авто
```

## Быстрый старт (после установки зависимостей)

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
# укажите свою строку подключения PostgreSQL в apps/api/.env
pnpm --filter @autobring/api prisma:generate
pnpm --filter @autobring/api prisma:migrate
node scripts/generate-dataset.mjs   # уже выполнено, файл в packages/mock-data/cars.json
pnpm dev   # запускает web (:3000) и api (:4000) параллельно через turbo
```

## GitHub Pages (демо-лендинг)

Статический экспорт `apps/web` деплоится Actions-ом на
[kirillchistov.github.io/autobring](https://kirillchistov.github.io/autobring/).

1. Репозиторий должен быть **public** (или GitHub Pro для private Pages).
2. Settings → Pages → **Source: GitHub Actions**.
3. Push в `main` (или ручной `workflow_dispatch`) запускает
   [`.github/workflows/deploy-web.yml`](./.github/workflows/deploy-web.yml).

Локальная проверка static-сборки:

```bash
pnpm --filter @autobring/web build:gh-pages
# артефакт в apps/web/out  (basePath /autobring)
```

Полный продукт позже — на Vercel (`web`) + Render (`api`); Pages сейчас только
для маркетингового демо без API.

## Sprint 0. Готово

- Монорепо на pnpm workspaces + Turborepo
- `packages/shared-types` — единые типы для фронта и бэка
- `packages/calculator-rates` — версионируемый конфиг ставок (⚠️ значения —
  плейсхолдеры, требуют сверки с актуальными ставками ФТС перед реальным
  использованием, см. комментарий в `rates.ts`) + чистая функция расчёта с
  unit-тестами (vitest)
- `apps/api` — Express-сервер: `/health`, `/auth/*` (register/login/refresh/
  logout на bcrypt+JWT+httpOnly cookie, часть логики — заглушки до подключения
  Prisma в Sprint 1), `/cars` (список/фильтры/карточка, читает
  `packages/mock-data/cars.json`), `/cars/calculate` (использует
  `calculator-rates`), `/deals` (защищённый скелет)
- `apps/web` — Next.js App Router, маркетинговый лендинг на дизайн-токенах,
  Tailwind-конфиг с фирменной палитрой/типографикой
  (см. `apps/web/design-tokens.md`), деплой демо на GitHub Pages
- Синтетический датасет: **240 карточек** (120 JP / 60 KR / 60 CN),
  SVG-плейсхолдеры вместо фото — `packages/mock-data/cars.json`
- Prisma-схема (`apps/api/prisma/schema.prisma`) — Car/User/Deal/Favorite/Alert
- [Demo-версия для обсуждения дизайна на GH Pages](https://kirillchistov.github.io/autobring/)

## Cледующие спринты

- Реальное подключение Prisma в auth/cars/deals роуты (сейчас частично заглушки —
  помечено `TODO(Sprint N)` в коде)
- UI каталога/карточки/калькулятора на фронте (Модули 1–3 куррикулума)
- Сверка реальных ставок пошлины/утильсбора с текущими источниками ФТС
- CI/CD и деплой (Vercel для `apps/web`, Render для `apps/api` — см.
  `implementation-plan.md`, включая заметку про доступность из РФ)

## Дисклеймер калькулятора

Ставки в `packages/calculator-rates/src/rates.ts` — заглушки для отработки
структуры расчёта. Перед показом реальным пользователям обязательно сверить
с актуальными ставками ФТС/постановлением об утильсборе и обновить
`RATES_VERSION`/`EFFECTIVE_FROM`.
