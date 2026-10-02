# Green API Chat

Веб-приложение для обмена сообщениями через GREEN-API.

## Требования

- Node.js 22.12 или новее (рекомендуется Node.js 22 LTS). Также поддерживается Node.js 20.19 или новее.
- npm (устанавливается вместе с Node.js) или pnpm

Если используете pnpm и он ещё не установлен, включите его через Corepack:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## Запуск демонстрационной версии

В корневой папке проекта выполните команды одного из менеджеров пакетов.

С npm:

```bash
npm install
npm run build
npm run preview
```

С pnpm:

```bash
pnpm install
pnpm build
pnpm preview
```

Откройте адрес, который появится в терминале. По умолчанию это [http://localhost:4173](http://localhost:4173). Оставьте терминал с сервером запущенным; для остановки нажмите `Ctrl+C`.

При первом открытии введите `idInstance` и `apiTokenInstance` от GREEN-API. Для обмена сообщениями нужны действующие учётные данные.

## Режим разработки

Для запуска приложения с горячей перезагрузкой используйте одну из команд:

```bash
npm run dev
```

или:

```bash
pnpm dev
```

Откройте адрес, указанный Vite в терминале (обычно [http://localhost:5173](http://localhost:5173)).
