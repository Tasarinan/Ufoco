var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var exec = require('child_process').exec;

gulp.task('css-app', function() {
    return gulp.src([
        'lib/normalize.custom.css',
        'lib/emojify-base.min.css',
        'lib/emojify-emoticons.min.css',
    ])
})