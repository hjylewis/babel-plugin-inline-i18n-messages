1. `npm install`
2. `npm run dev` OR `npm run build && npm run start`

#### NOTE:

Next.js doesn't support exporting multiple webpack configs in `next.config.js` (https://github.com/zeit/next.js/issues/1306), so each page will have relevant messages for **all** locales bundled in. This leads to increased bundle size as compared to the vanilla example.

More: https://github.com/hjylewis/babel-plugin-inline-i18n-messages/issues/6

