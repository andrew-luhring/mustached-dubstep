task("default", ["lint"]);
    desc("Lint code");

task("lint", [], function(){
   var lint = require("./build/lint/lint_runner.js");
    lint.validateFile("jakefile.js", {}, { });
});
