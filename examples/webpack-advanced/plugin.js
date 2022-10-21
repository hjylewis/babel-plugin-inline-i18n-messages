const getMessage = require("./i18n/getMessage");
const { ReplaceSource } = require("webpack-sources");

const SENTINEL_IDENTIFIER = "] :: TRANSLATION_TIME :: [";

class ReplaceSentinelPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("ReplaceSentinelPlugin", (compilation) => {
      const assets = compilation.getAssets();

      assets.forEach((asset) => {
        const content = asset.source.source();

        const sections = content.split(SENTINEL_IDENTIFIER);
        const sentinelLocations = [];

        let indexOfCurrentSection = 0;
        sections.forEach((section, i) => {
          if (i % 2 === 0) {
            // this is source code, leave alone

            const indexOfNextSection = indexOfCurrentSection + section.length;
            indexOfCurrentSection = indexOfNextSection;
            return;
          } else {
            // this is a sentinel, log the start and end indexes so that we can replace with localized content later

            // "] :: TRANSLATION_TIME :: [key] :: TRANSLATION_TIME :: ["
            //  ^                                                      ^
            //  indexOfCurrentSection                                  indexOfNextSection

            const indexOfNextSection =
              indexOfCurrentSection +
              section.length +
              SENTINEL_IDENTIFIER.length * 2;

            sentinelLocations.push({
              key: section,
              start: indexOfCurrentSection - 1, // include beginning quote (")!
              end: indexOfNextSection, // include the ending quote (")
            });

            indexOfCurrentSection = indexOfNextSection;
          }
        });

        ["en", "es"].forEach((locale) => {
          const newSource = new ReplaceSource(asset.source);

          if (/\.(j|t)s$/.test(asset.name)) {
            // Add global variable to pass locale to JS
            newSource.insert(0, `window.__intl_locale="${locale}";\n`);
          }

          // Replace sentinels with localized messages
          sentinelLocations.forEach(({ key, start, end }) => {
            const payload = getMessage(key, locale);
            newSource.replace(start, end, JSON.stringify(payload));
          });

          compilation.emitAsset(`${locale}/${asset.name}`, newSource);
        });
      });
    });
  }
}

module.exports = ReplaceSentinelPlugin;
