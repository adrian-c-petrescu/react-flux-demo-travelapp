'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var glob = require('glob');

function injectIndex(options) {
    function run() {
        console.log('Running inject');

        var target = gulp.src('./index.html');
        var sources = gulp.src([
            './dist/css/*.css',
            './dist/scripts/vendor.js',
            './dist/scripts/bundle.js'
        ], { read: false });

        return target
            .pipe(inject(sources, { ignorePath: '/dist/', addRootSlash: false, removeTags: true }))
            .pipe(gulp.dest('./dist'));
    }

    var jsCssGlob = 'dist/**/*.{js,css}';

    function checkForInitialFilesThenRun() {
        glob(jsCssGlob, options, function (er, files) {
            var filesWeNeed = ['dist/scripts/bundle', 'dist/scripts/vendor', 'dist/css/bootstrap'];

            function fileIsPresent(fileWeNeed) {
                return files.some(function(file) {
                    return file.indexOf(fileWeNeed) !== -1;
                });
            }

            if (filesWeNeed.every(fileIsPresent)) {
                console.log('running initial build');
                run('initial build');
            } else {
                console.log('not every file is present');
                checkForInitialFilesThenRun();
            }
        });
    }

    checkForInitialFilesThenRun();
}

module.exports = {
    build: function() { return injectIndex({ shouldWatch: false }); }
};
