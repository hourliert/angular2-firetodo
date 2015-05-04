// Karma configuration
// Generated on Sun May 03 2015 10:03:17 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'jspm'],
    
    jspm: {
        config: 'src/config.js',
        packages: 'src/jspm_packages/',
        // Edit this to your needs 
        loadFiles: [
          'src/!(jspm_packages)/**/!(main)*spec.js'
        ],
        serveFiles: [
          'src/!(jspm_packages)/**/!(main).js'
        ]
    },
    
    proxies: {
      '/base/jspm_packages/': '/base/src/jspm_packages/',
      '/base/lib/': '/base/src/lib/'
    },


    preprocessors: {
      // source files, that you wanna generate coverage for 
      // do not include tests or libraries 
      // (these files will be instrumented by Istanbul) 
      'src/!(jspm_packages|lib)/**/!(*.spec).js': ['coverage']
    },
    
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
