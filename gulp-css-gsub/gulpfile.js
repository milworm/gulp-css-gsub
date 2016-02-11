const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
 
gulp.task('default', () => {
    return watch('src/*', () => {
        return gulp.src('src/*')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('lib'));
    });
});