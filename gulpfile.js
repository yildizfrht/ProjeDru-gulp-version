"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

const buildConfig = require("./gulp.config");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Home CSS expanded
function cssHome() {
  return gulp
    .src(buildConfig.sassHomeFiles)
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(concat(buildConfig.cssHomeFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// Home CSS compressed
function cssHomeMin() {
  return gulp
    .src(buildConfig.sassHomeFiles)
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat(buildConfig.cssHomeFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}


// Home Scripts expanded
function jsHome() {
  return gulp
    .src(buildConfig.jsHomeFiles)
    .pipe(plumber())
    .pipe(concat(buildConfig.jsHomeFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// Home Scripts compressed
function jsHomeMin() {
  return gulp
    .src(buildConfig.jsHomeFiles)
    .pipe(plumber())
    .pipe(concat(buildConfig.jsHomeFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}


// Library Scripts compressed
function jsLibMin() {
  return gulp
    .src(buildConfig.jsLibFiles)
    .pipe(plumber())
    .pipe(concat(buildConfig.jsLibFileName))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(buildConfig.dist))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch(buildConfig.sassHomeFiles, cssHome);
  gulp.watch(buildConfig.jsHomeFiles, gulp.series(jsHome));
  gulp.watch(buildConfig.jsLibFiles, gulp.series(jsLibMin));
  gulp.watch(["./**/*"], gulp.series(browserSyncReload));
}

// build
gulp.task(
  "default",
  gulp.series(
    gulp.parallel(cssHomeMin, jsHomeMin, jsLibMin)
  )
);

// watch
gulp.task("watch", gulp.parallel(watchFiles, browserSync));
