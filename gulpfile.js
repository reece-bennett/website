const browserSync = require("browser-sync");
const del = require("del");
const gulp = require("gulp");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const stylus = require("gulp-stylus");

const paths = {
  assets: {
    src: "assets/**/!(_)*",
    dest: "docs"
  },
  css: {
    src: "css/!(_)*.styl",
    dest: "docs/css"
  },
  views: {
    src: "views/!(_)*.pug",
    dest: "docs"
  }
}

// Clean assets
function clean() {
  return del([paths.views.dest]);
}

// Compile pages and move assets
function assets() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
}

function css() {
  return gulp.src(paths.css.src)
    .pipe(stylus())
    .pipe(gulp.dest(paths.css.dest));
}

function views() {
  return gulp.src(paths.views.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename(path => {
      if (path.basename != "index") {
        path.dirname += `/${path.basename}`;
        path.basename = "index"
      }
    }))
    .pipe(gulp.dest(paths.views.dest));
}

// Browsersync
const server = browserSync.create()

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: paths.repo
    },
    open: false
  });
  done();
}

// Auto run when files change
function watch() {
  gulp.watch(paths.assets.src, gulp.series(assets, reload));
  gulp.watch(paths.css.src, gulp.series(css, reload));
  gulp.watch(paths.views.src, gulp.series(views, reload));
}

// Combine tasks into build task
const build = gulp.series(clean, views, css, assets);

// Expose tasks to CLI
exports.build = build;
exports.clean = clean;
exports.default = gulp.series(build, serve, watch);
