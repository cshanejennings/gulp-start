var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');

var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp.src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    clean(files);
    done();
});

gulp.task('styles', ['clean-styles'], function () {
    log('compiling Less --> CSS');
    return gulp
        .src(config.less.files)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer(config.less.prefixer))
        .pipe(gulp.dest(config.temp));
})

gulp.task('less-watcher', function() {
    gulp.watch([config.less.files], ['styles']);
});

function log(msg) {
    var item;
    if (typeof(msg) === 'object') {
        for (item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
