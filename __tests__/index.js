const path = require("path");
const fs = require("fs");
const pluginTester = require("babel-plugin-tester").default;
const plugin = require("../src/index");

function createTests() {
  const fixturesDir = path.join(__dirname, "./__fixtures__");
  return fs.readdirSync(fixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);

    const test = {
      title: caseName,
      setup() {
        process.chdir(fixtureDir);
      },
      fixture: path.join(fixtureDir, "code.js"),
      pluginOptions: require(path.join(fixtureDir, "options.json")),
    };

    if (fs.existsSync(path.join(fixtureDir, "output.js"))) {
      test.outputFixture = path.join(fixtureDir, "output.js");
    }

    if (fs.existsSync(path.join(fixtureDir, "babel.json"))) {
      test.babelOptions = require(path.join(fixtureDir, "babel.json"));
    }

    if (fs.existsSync(path.join(fixtureDir, "error.js"))) {
      test.error = require(path.join(fixtureDir, "error.js"));
    }

    return test;
  });
}

pluginTester({
  plugin,
  tests: createTests(),
});
