const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rimraf= require('rimraf');
const rename= require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');


/*----- Server --------*/
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 4000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload)
});


/*----- Style ------*/
gulp.task('styles:compile', function () {
    return gulp.src('src/style.scss')
        .pipe(plumber())
        .pipe(sass().on('error', notify.onError(function(err) {
            return {
                title: 'Styles',
                message: err.message
            };
        })))
        .pipe(rename('main.min.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('build/style'))
        });


/*------ HTML -------*/
gulp.task('copy:html', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
});


/*------ Delete -------*/
gulp.task('clean', function del(cb){
    return rimraf('build', cb);
});

/*_____________Watchers___________*/
gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.series('copy:html'));
    gulp.watch('src/**/*.scss', gulp.series('styles:compile'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('copy:html', 'styles:compile'),
    gulp.parallel('watch', 'server')
));


