const { dest, parallel, series, src, watch } = require("gulp");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const del = require("del");
const git = require("gulp-git");
const moment = require("moment");
const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");

function clean() {
  return del("build");
}

function html() {
  return src("html/*.html")
  .pipe(dest("build"));
}

function css() {
  return src("css/*.scss", { sourcemaps: true })
  .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
  .pipe(dest("build/css", { sourcemaps: "." }))
  .pipe(server.stream());
}

function js() {
  return src("js/*.js", { sourcemaps: true })
    .pipe(concat("script.min.js"))
    .pipe(terser())
  .pipe(dest("build/js", { sourcemaps: "." }));
}

function assets() {
  return src(["assets/**/*", "favicon/generated/*"])
    .pipe(dest("build"));
}

/*
* Browser-Sync
*/
const server = browserSync.create();

function bs_serve(done) {
  server.init({
    server: {
      baseDir: "build"
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
* Git / Github Pages
*/
function cleanRepo() {
  return del("repo");
}

function clone(done) {
  git.clone("git@github.com:reece-bennett/website.git", {args: "-n -b gh-pages repo"}, err => {
    if (err) throw err;
    done();
  });
}

function copyFiles() {
  return src("build/**/*")
    .pipe(dest("repo"));
}

function commit() {
  const dateString = moment().local().format("YYYY-MM-DD hh:mm:ss A");

  return src("repo/*")
    .pipe(git.add({cwd: "repo"}))
    .pipe(git.commit(`Site built ${dateString}`, {cwd: "repo"}));
}

function push(done) {
  git.push("origin", "gh-pages", {cwd: "repo"}, err => {
    if (err) throw err;
    done();
  })
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

exports.deploy = series(exports.build, cleanRepo, clone, copyFiles, commit, push, cleanRepo);

exports.default = series(exports.build, bs_serve, bs_watch);
