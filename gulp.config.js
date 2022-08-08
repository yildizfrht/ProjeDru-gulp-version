var fs = require("fs");
var pkg = require("./package.json");

module.exports = {
  jsLibFileName: "libs.js",
  jsHomeFileName: "home.js",
  cssHomeFileName: "home.css",
  dist: "dist",

  //js-lib-files
  jsLibFiles: [
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],

  //js-home-file
  jsHomeFiles: [
    "assets/js/*.js"
  ],

  //sass-home-file
  sassHomeFiles: [
    "assets/sass/main-home.scss",
    "assets/sass/pages/home.scss"
  ],

  // html files
  htmlFiles: ["./*.html"],

  versionData: {
    version: pkg.version
  }
};
