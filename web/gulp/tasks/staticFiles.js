'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');

var targets = [

    { description: 'CSS1', src: './node_modules/bootstrap/dist/css/bootstrap.css', dest: './dist/css' },
    { description: 'FONTS', src: './node_modules/bootstrap/dist/fonts/*', dest: './dist/fonts' },
    { description: 'IMAGES', src: './images/*', dest: './dist/images' }
];

function copy() {
    function run(target) {
        console.log('copying ' + target.src + ' to ' + target.dest);
        gulp.src(target.src)
            .pipe(cache(target.description))
            .pipe(gulp.dest(target.dest));
    }

    targets.forEach(run);
}

module.exports = {
    build: function() { return copy(); }
};
