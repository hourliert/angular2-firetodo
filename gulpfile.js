var ts          = require('gulp-typescript'),
    gulp        = require('gulp'),
    merge       = require('merge-stream'),
    header      = require('gulp-header'),
    typescript  = require('typescript'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

var PATHS = {
  src: './src',
  serve: './.tmp',
  angular: './bundle',
  typings: './typings'
};

var compilerOptions = require('./tsconfig.json').compilerOptions;
compilerOptions.typescript = typescript;
var tsProject = ts.createProject(compilerOptions);

/**
 * Angular2 Tasks
 * These tasks will be deleted when angular2 will be released.
 */
gulp.task('copy-angular', function() {
  return gulp.src(PATHS.angular + "/angular2.dev.js")
    .pipe(gulp.dest(PATHS.serve));
});
gulp.task('copy-angular.d', function() {
  return gulp.src(PATHS.angular + '/angular2.d.ts')
    .pipe(gulp.dest(PATHS.typings + '/angular2/'));
});
gulp.task('prepare-angular2', ['copy-angular', 'copy-angular.d']);


/**
 * Typescript tasks
 * Compile typescript files into tmp (served) directory.
 */
gulp.task('typescript', function() {
    var tsResult = gulp.src(PATHS.src + '/**/*.ts')
                    .pipe(sourcemaps.init())
                    .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(PATHS.serve + '/definitions')),
        tsResult.js
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(PATHS.serve + '/'))
    ]);
});
gulp.task('ts-watch', ['typescript'], browserSync.reload);


/**
 * HTML tasks
 * Simply copy html files to .tmp directory.
 * Injection tasks should be placed here.
 */
gulp.task('html-watch', ['copy-html'], browserSync.reload);
gulp.task('copy-html', function() {
  return gulp.src(PATHS.src + '/**/*.html')
    .pipe(gulp.dest(PATHS.serve));
});


/**
 * DEV tasks
 * Serve localy the app.
 */
gulp.task('serve', ['copy-html', 'typescript', 'prepare-angular2'], function () {
  browserSync({
    server: {
      baseDir: PATHS.serve
    }
  });

  gulp.watch([
    PATHS.src + '/**/*.ts'
  ], ['ts-watch']);
  gulp.watch([
    PATHS.src + '/**/*.html'
  ], ['html-watch']);
});


