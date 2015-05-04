var ts          = require('gulp-typescript'),
    del         = require('del'),
    gulp        = require('gulp'),
    path        = require('path'),
    bump        = require('gulp-bump'),
    merge       = require('merge-stream'),
    gutil       = require('gulp-util'),
    karma       = require('gulp-karma'),
    header      = require('gulp-header'),
    typescript  = require('typescript'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

var PATHS = {
  src: './src',
  build: './build',
  typings: './typings',
  coverage: './coverage'
};

var compilerOptions = require('./tsconfig.json').compilerOptions;
compilerOptions.typescript = typescript;
var tsProject = ts.createProject(compilerOptions);

/**
 * Typescript tasks
 * Compile typescript files into tmp (served) directory.
 */
gulp.task('typescript', function() {
    var tsResult = gulp.src(PATHS.src + '/**/*.ts')
                    .pipe(sourcemaps.init())
                    .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(PATHS.build + '/definitions')),
        tsResult.js
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(PATHS.src))
    ]);
});
gulp.task('watch-ts', ['typescript'], browserSync.reload);


/**
 * HTML tasks
 */
 gulp.task('watch-html', browserSync.reload);


/**
 * BUILD tasks TODO: need concat, uglify, minification
 */

/**
 * developpment server
 * auto reload the browser on src file change
 */
gulp.task('serve', ['typescript'], function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch([
    PATHS.src + '/**/*.ts'
  ], ['watch-ts']);
  
  gulp.watch([
    PATHS.src + '/**/*.html'
  ], ['watch-html']);
});

/**
 * TEST tasks
 */
 /**
  * run all tests once
  */
gulp.task('test', ['typescript'], function () {
  return gulp.src('')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});
/**
 * Run test on file change
 */
gulp.task('test:watch', ['typescript'], function () {
  gulp.watch([
    PATHS.src + '/**/*.ts'
  ], ['watch-ts']);
  
  return gulp.src('')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      throw err;
    });
});
 

/**
 * version bunping
 */
gulp.task('bump', function() {
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});
gulp.task('bump:minor', function() {
    gulp.src('./package.json')
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});
gulp.task('bump:major', function() {
    gulp.src('./package.json')
        .pipe(bump({type: 'major'}))
        .pipe(gulp.dest('./'));
});

/**
 * CLEANING tasks
 */
gulp.task('clean-build', function(cb) {
    del([
        PATHS.build
    ], cb);
});
gulp.task('clean-coverage', function(cb) {
    del([
        PATHS.coverage
    ], cb);
});
gulp.task('clean-typings', function(cb) {
    del([
        PATHS.typings
    ], cb);
});
gulp.task('clean-js', function(cb) {
    del([
        PATHS.src + '/!(jspm_packages|lib)/**/!(*config).js'
    ], cb);
});
gulp.task('clean', ['clean-build', 'clean-coverage', 'clean-typings', 'clean-js']);