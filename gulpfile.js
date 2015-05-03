var ts          = require('gulp-typescript'),
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
  src: './lib',
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
    .pipe(gulp.dest(PATHS.serve + '/bundle'));
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
          .pipe(gulp.dest(path.join(PATHS.serve, PATHS.src)))
    ]);
});

/**
 * HTML tasks
 * Simply copy html files to .tmp directory.
 * Injection tasks should be placed here.
 */
gulp.task('html', ['copy-html', 'copy-index']);
gulp.task('copy-index', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest(PATHS.serve));
});
gulp.task('copy-html', function() {
  return gulp.src(PATHS.src + '/**/*.html')
    .pipe(gulp.dest(path.join(PATHS.serve, PATHS.src)));
});

/**
 * BUILD tasks
 */
gulp.task('build', ['html', 'typescript'], browserSync.reload);

 /**
  * local web server
  */
gulp.task('serve', ['build', 'prepare-angular2'], function () {
  browserSync({
    server: {
      baseDir: PATHS.serve
    }
  });

  gulp.watch([
    PATHS.src + '/**/*.ts',
    PATHS.src + '/**/*.html',
    './index.html'
  ], ['build']);
});

/**
 * TDD tasks
 */
gulp.task('test', [], function () {
  return gulp.src(PATHS.src + '/**/*.spec.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});
 
 /**
  * DEPLOY tasks
  */
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
