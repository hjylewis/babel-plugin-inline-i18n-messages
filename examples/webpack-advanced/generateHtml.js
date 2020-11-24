const fs = require("fs");

fs.mkdirSync(`./dist/`, { recursive: true });

["en", "es"].forEach((locale) => {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <script src="${locale}/index.js"></script> 
    </body>
  </html>
  `;

  fs.writeFileSync(`./dist/${locale}.html`, html);
});
