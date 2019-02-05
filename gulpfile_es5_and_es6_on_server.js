const gulp         = require('gulp')
const plumber      = require('gulp-plumber')
const sourcemaps   = require('gulp-sourcemaps') //sourcemaps compatibility -> https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
const sass         = require('gulp-sass')
const cleanCSS     = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat')
// ---------js only--------------
const browserify   = require('browserify')
const babelify     = require('babelify')
const source       = require('vinyl-source-stream')
const buffer       = require('vinyl-buffer')
const uglify       = require('gulp-uglify')
const rename       = require('gulp-rename')

//(...)

// BROWSER SYNC
let bsync = require('browser-sync').create()
gulp.task('browserSync', () => {
    bsync.init({
        proxy: 'bl.keepthinking.net/wkcd',
        host: 'bl.keepthinking.net',
        port: 4000,
        ui:{
            port: 4001
        },
        open: false,
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            }
        }
    })
})


// --------JAVASCRIPT------------
const jsEs5 = ()=> {
    es5.forEach((item)=> gulp.src(item.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(rename(item.dist))
        .pipe(gulp.dest(dest.javascript)
        )
    )
}

// es5 and es6
gulp.task('js', ()=>{
    jsEs5()
    return browserify({entries: javascript.bundle.src, debug: true})
        .transform(babelify.configure ({ 
            presets: ['es2015', '@babel/preset-react'],
            sourceMaps: true,
        }))
        .bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source(javascript.bundle.dist))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest.javascript))
})


// -------CSS STYLE--------------
let scss_constructor_task = (obj_name) => {
    gulp.task(obj_name, () => {
        return gulp.src(css[obj_name].src, { base: './src/scss' })
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass().on('error',sass.logError))
            .pipe(autoprefixer())
            .pipe(concat(css[obj_name].dist))
            .pipe(cleanCSS({debug: true}, (details) => {
                console.log(`${obj_name}: ${details.stats.timeSpent}ms`);
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dest.css))
            .pipe(bsync.stream())
    })
}


//(...)



scss_constructor_task('mobile_base')
scss_constructor_task('mobile_content')
scss_constructor_task('desktop_base')
scss_constructor_task('desktop_content')
scss_constructor_task('desktop_ie')
scss_constructor_task('common')
scss_constructor_task('print')

gulp.task('scss', [
    'mobile_base', 
    'mobile_content', 
    'desktop_base', 
    'desktop_content', 
    'desktop_ie', 
    'print',
    'common'
])

let scss_constructor_watch = (obj_name) => {
    gulp.watch(css[obj_name].src, [obj_name])
}
let watch_scss = () => {
    gulp.watch('./src/scss/common/_variables.scss', ['scss'])
    scss_constructor_watch('mobile_base')
    scss_constructor_watch('mobile_content')
    scss_constructor_watch('desktop_base')
    scss_constructor_watch('desktop_content')
    scss_constructor_watch('desktop_ie')
    scss_constructor_watch('common')
    scss_constructor_watch('print')
}


// BAR
gulp.task('watch_bs', ['browserSync'], () => {
    watch_scss()
    gulp.watch(['./src/js/**/*.js'], ['js']).on('change', bsync.reload)
    gulp.watch([
        '../application/**/*.php', 
        './**/*.html'
    ]).on('change', bsync.reload)
})
gulp.task('bar', ['watch_bs', 'scss', 'js'])



// RUN AND WATCH
// `gulp watch`
gulp.task('watch-default', () =>  watch_scss() )
gulp.task('watch', ['scss', 'js', 'watch-default'])

// RUN AND EXIT
// `gulp`
gulp.task('default', ['scss', 'js'])

