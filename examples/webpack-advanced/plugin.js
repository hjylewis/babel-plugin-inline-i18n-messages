const getMessage = require("./i18n/getMessage");
const { ReplaceSource } = require("webpack-sources");

const SENTINEL_IDENTIFIER = "] :: TRANSLATION_TIME :: [";

class ReplaceSentinelPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise("ReplaceSentinelPlugin", (compilation) => {
      const assets = compilation.getAssets();

      return Promise.all(
        assets.map((asset) => {
          const content = asset.source.source();

          const sections = content.split(SENTINEL_IDENTIFIER);
          const keyMatches = [];

          let start = 0;
          sections.forEach((section, i) => {
            if (i % 2 === 0) {
              //source code, leave alone;
              start += section.length;
              return;
            } else {
              // match

              const end =
                start + section.length + SENTINEL_IDENTIFIER.length * 2;
              keyMatches.push({
                key: section,
                start: start - 1,
                end: end,
              });

              start = end;
            }
          });

          ["en", "es"].forEach((locale) => {
            const newSource = new ReplaceSource(asset.source);

            newSource.insert(0, `window.__intl_locale="${locale}";`);

            keyMatches.forEach(({ key, start, end }) => {
              const payload = getMessage(key, locale);
              newSource.replace(start, end, JSON.stringify(payload));
            });

            compilation.emitAsset(
              `${locale}/${asset.name}`,
              newSource,
              asset.info
            );
          });

          return Promise.resolve();
        })
      );
    });
  }
}

module.exports = ReplaceSentinelPlugin;
