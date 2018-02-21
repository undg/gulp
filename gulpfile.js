console.log(`
##################
#   start gulp   #
##################
`)
// GULP REQUIRE
var gulp = require("gulp"),
  gulp           = require("gulp"),
  watch          = require("gulp-watch"),
  plumber        = require("gulp-plumber"),
  sass           = require("gulp-sass"),
  cleanCSS       = require("gulp-clean-css"),
  autoPrefixer   = require("gulp-autoprefixer"),
  order          = require("gulp-order"),
  concat         = require("gulp-concat"),
  include        = require("gulp-include"),
  uglify         = require("gulp-uglify"),
  sourcemaps     = require("gulp-sourcemaps"), 
  rename         = require("gulp-rename"),
  // mocha          = require("gulp-mocha"),
  bsync          = require("browser-sync").create()

// FILE DESTINATIONS
var dist = {
  php: "dist",
  html: "dist",
  css: "dist/css/",
  font: "dist/font",
  js: "dist/js",
  img: "dist/img"
}

var src = {
  watch: {
    js: "src/js/**/*js"
  },
  js: "src/js/1-include.js" ,
  css: "src/css/1-include.sass",
  sass: "src/css/**/*.sass",
  // php: "src/**/*.php",
  html: "src/**/*.html",
  // font: "src/font/**/*.ttf",
  // test: [
  //   "test/*Test.js"
  // ],
  img: "src/img/**/*"
}
// BROWSER SYNC
gulp.task('browser-sync', function() {
  bsync.init({
    server: {
        basedir: "./"
    },
    // proxy: "localhost:80",
    browser: "chromium",
    open: false
  })

})

// style
gulp.task('style', function() {
  return gulp.src(src.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(sass().on('error',sass.logError))
      .pipe(autoPrefixer())
      .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename("main.css"))
    .pipe(gulp.dest(dist.css))
    .pipe(bsync.stream())
})

// JAVASCRIPT
gulp.task('javascript', function() {
  return gulp.src(src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(uglify())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.js))
})

// PHP
// gulp.task('php', function() {
//   return gulp.src(src.php)
//     .pipe(gulp.dest(dist.php))
// })

// HTML
gulp.task('html', function() {
  return gulp.src(src.html)
    .pipe(gulp.dest(dist.html))
})

// IMG
gulp.task('img', function() {
  return gulp.src(src.img)
    .pipe(gulp.dest(dist.img))
})

// // FONT
// gulp.task('font', function() {
//   return gulp.src(src.font)
//     .pipe(gulp.dest(dist.font))
// })

// // MOCHA TEST
// gulp.task('testMocha', function(){
// console.log(`
//          ##################
//          #   MOCHA TASK   #
//          ##################
// `)
//   return gulp.src(src.test)
//     .pipe(mocha())
// })

// WATCH
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(src.sass, ['style'])
  gulp.watch(src.watch.js, ['javascript']).on('change', bsync.reload)
  gulp.watch(src.html, ['html'])
  gulp.watch(src.img, ['img'])
  // gulp.watch(src.test, ['testMocha'])
  // gulp.watch(src.php, ['php']).on('change', bsync.reload)
  // gulp.watch(src.font, ['font'])
})
// DEFAULT
gulp.task('default', ['watch', 'style', 'javascript', 'html', 'img'])

