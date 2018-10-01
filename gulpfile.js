var gulp = require("gulp");
var pug = require("gulp-pug");

const paths = {
  views: {
    src: "views/*.pug",
    dest: "dist"
  }
}

function views() {
  return gulp.src(paths.views.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.views.dest));
}

function watch() {
  gulp.watch(paths.views.src, views);
}

const build = gulp.series(views);

exports.build = build;
exports.default = build;
exports.watch = watch;
