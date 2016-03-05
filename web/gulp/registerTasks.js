'use strict';

var gulp = require('gulp');
var browserify = require('./tasks/browserify');
var staticFiles = require('./tasks/staticFiles');
var eslint = require('gulp-eslint');
var inject = require('./tasks/inject');
var clean = require('./tasks/clean');
var gutil = require('gulp-util');
var Promise = require('promise');

var srcs = ['./gulp/**/*.js', './js/**/*.js'];


gulp.task('build-process.env.NODE_ENV', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('delete-dist', function (done) {
    clean.run(done);
});

gulp.task('build-other', ['delete-dist', 'build-process.env.NODE_ENV'], function() {
    staticFiles.build();
});

gulp.task('build-js', ['delete-dist', 'build-process.env.NODE_ENV'], function(done) {
    browserify.build().then(function() { done(); });
});

gulp.task('lint', function () {
    return gulp.src(srcs)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('build', ['build-js', 'lint', 'build-other' ], function () {
    inject.build();
});
