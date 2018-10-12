const browserSync = require("browser-sync");
const del = require("del");
const git = require("gulp-git");
const gulp = require("gulp");
const moment = require("moment");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
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
  repo: "dist",
  views: {
    src: "views/!(_)*.pug",
    dest: "dist"
  }
}

// Clean assets
function clean() {
  return del([paths.repo]);
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

// Deploy to master branch
function init() {
  return git.init({cwd: paths.repo})
}

function add() {
  const dateString = moment().local().format("YYYY-MM-DD hh:mm:ss A");

  return gulp.src("dist/*")
    .pipe(git.add({cwd: paths.repo}))
    .pipe(git.commit(`Site updated: ${dateString}`, {cwd: paths.repo}));
}

function push(done) {
  git.push("git@github.com:PhyscoKillerMonkey/physcokillermonkey.github.io.git", "master", {args: "--force", cwd: paths.repo}, (err) => {
    if (err) throw err;
    done();
  });
}

// Combine tasks into build task
const build = gulp.series(clean, views, css, assets);

// Expose tasks to CLI
exports.build = build;
exports.clean = clean;
exports.default = gulp.series(build, serve, watch);
exports.deploy = gulp.series(build, init, add, push);;
