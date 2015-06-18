'use strict'

var gulp = require('gulp');

var paths = {
    src: 'app',
    dist: 'dist',
    tmp: '.tmp',
};

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del']
});

var browserSync = require('browser-sync');
var reload = browserSync.reload;

//var fs = require('fs');

//var AUTOPREFIXER_BROWSERS = [
//  'ff >= 30',
//  'chrome >= 34',
//  'safari >= 7',
//  'ios >= 7',
//  'android >= 4.4'
//];

// MARKUPS

gulp.task('markups', function() {
    function renameToHtml(path) {
        path.extname = '.html';
    }
    return gulp.src(paths.src + '/*.jade')
        .pipe($.jade({
            pretty: true
        }))
        .pipe($.rename(renameToHtml))
        .pipe(gulp.dest(paths.tmp));
});


// STYLES

// WATCH

gulp.task('watch', ['markups'], function() {

    gulp.watch([
        paths.tmp + '/*.html',
        paths.src + '/styles/**/*.css',
        paths.src + '/scripts/**/*.js',
        paths.src + '/images/**/*'
    ]).on('change', reload);

    gulp.watch(paths.src + '/**/*.jade', ['markups']);
});

// LINTERS


// EXTRAS


// GENERAL TASKS

gulp.task('clean', function(done) {
    $.del([paths.dist + '/', paths.tmp + '/'], done);
});

gulp.task('serve', ['watch'], function() {
    browserSync({
        server: {
            baseDir: [paths.tmp, paths.src],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
});

gulp.task('default', ['clean'], function() {
    gulp.start('serve');
});
