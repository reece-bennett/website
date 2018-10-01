const gulp = require("gulp");
const pug = require("gulp-pug");
const stylus = require("gulp-stylus");

const paths = {
  assets: {
    src: "assets/**/*",
    dest: "dist"
  },
  css: {
    src: "css/!(_)*.styl",
    dest: "dist/css"
  },
  views: {
    src: "views/!(_)*.pug",
    dest: "dist"
  }
}

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
    .pipe(gulp.dest(paths.views.dest));
}

function watch() {
  gulp.watch(paths.assets.src, assets);
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.views.src, views);
}

const build = gulp.series(views, css, assets);

exports.build = build;
exports.default = build;
exports.watch = watch;
