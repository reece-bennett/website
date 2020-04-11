const { dest, parallel, series, src, watch } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const del = require("del");
const browserSync = require("browser-sync");
const terser = require("gulp-terser");

sass.compiler = require("node-sass");

function clean() {
  return del("docs");
}

function html() {
  return src("html/*.html")
  .pipe(dest("docs"));
}

function css() {
  return src("css/*.scss", { sourcemaps: true })
  .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
  .pipe(dest("docs/css", { sourcemaps: "." }))
  .pipe(server.stream());
}

function js() {
  return src("js/*.js", { sourcemaps: true })
    .pipe(concat("script.min.js"))
    .pipe(terser())
  .pipe(dest("docs/js", { sourcemaps: "." }));
}

function assets() {
  return src("assets/**/*")
    .pipe(dest("docs"));
}

/*
* Browser-Sync
*/
const server = browserSync.create();

function bs_serve(done) {
  server.init({
    server: {
      baseDir: "docs"
    },
    open: false
  });
  done();
}

function bs_reload(done) {
  server.reload();
  done();
}

function bs_watch() {
  watch("assets", series(assets, bs_reload));
  watch("html/*.html", series(html, bs_reload));
  watch("css/*.scss", css);
  watch("js/*.js", series(js, bs_reload));
}

/*
* Expose tasks to gulp CLI
*/
exports.assets = assets;
exports.clean = clean;
exports.css = css;
exports.html = html;
exports.js = js;
exports.build = series(clean, parallel(html, css, js, assets));

exports.default = series(exports.build, bs_serve, bs_watch);