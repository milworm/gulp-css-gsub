var gulp = require("gulp"),
    cssGsub = require("../gulp-css-gsub/lib/main.js"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    watch = require("gulp-watch");
    babel = require("gulp-babel"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload

gulp.task("serve", ["js-start", "sass-start"], function() {
    browserSync({
        server: {
            baseDir: ['./']
        }
    });
});

gulp.task("sass", function() {
    return gulp.src('./sass/**/*.scss')
            .pipe(sass({
                errLogToConsole: true
            }))
          // .pipe(autoprefixer({
          //     browsers: ['last 2 versions'],
          //     cascade: false
          // }))
          .pipe(gulp.dest('./dist/css'))
          .pipe(reload({
                stream: true
            }));
});

gulp.task("sass-start", function() {
    watch('./sass/**/*.scss', function() {
        gulp.start('sass');
    });
});

gulp.task("js", function() {
    return gulp.src('./js/**/*.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('./dist/js'))
            .pipe(reload({
                stream: true
            }))
});

gulp.task("js-start", function() {
    watch('./js/**/*.js', function() {
        gulp.start('js');
    });
});

gulp.task("css-gsub", function() {
    return gulp.src("./dist/css/main.css")
                .pipe(cssGsub({ 
                    jsIn: "./dist/js/app.js", 
                    jsOut: "./dist/js/app.min.js",
                    prefix: "d"
                }))
                .pipe(rename("main.min.css"))
                .pipe(gulp.dest("./dist/css"));
});

gulp.task("default", ["css-gsub"]);