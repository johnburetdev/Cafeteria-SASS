const { src, dest, watch, series } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

function css(done) {
  src("src/scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));

  done();
}

function imagenes() {
  return src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
}

function versionWebp() {
  return src("src/img/**/*.{jpg, png}").pipe(webp()).pipe(dest("build/img"));
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionWebp, css, dev);
