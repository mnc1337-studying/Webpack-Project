# Webpack: розширена версія

Продовження базової збірки: додано TypeScript, препроцесори стилів, Babel, ESLint та аналіз бандлів.

## Запуск

Потрібен Node.js версії 18+.

    npm install
    npm run dev       # dev-сервер із автоперезавантаженням, http://localhost:3000
    npm run build     # продакшн-збірка в dist/
    npm run lint      # перевірка коду через ESLint
    npm run analyze   # збірка зі звітом Bundle Analyzer

## Що налаштовано

- **DevServer.** Сторінка перезавантажується сама, щойно відбуваються зміни в коді.
- **CSS.** Підключаються як звичайні `.css`-файли, так і стилі з Sass/SCSS та LESS.
- **TypeScript.** `.ts`-файли компілюються в збірці.
- **Babel.** Сучасний JavaScript транспілюється, щоб працювати в старіших браузерах.
- **ESLint.** Код перевіряється на помилки та відхилення від стилю.
- **Bundle Analyzer.** Показує, з чого складається збірка і скільки займає кожен пакет.

## Структура

    src/
      index.html
      scripts/
      styles/
      assets/
    webpack.config.js
    tsconfig.json
    babel.config.json
    eslint.config.js