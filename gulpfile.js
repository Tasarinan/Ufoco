var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('testConcat', function() {
    gulp.src(['F:/英语听力入门1/*.txt',
            'F:/英语听力入门2/*.txt',
            'F:/英语听力入门3/*.txt',
            'F:/英语听力入门4/*.txt',
        ])
        .pipe(concat('english.txt')) //合并后的文件名
        .pipe(gulp.dest('dist/'));

});

gulp.task('default', ['testConcat']);