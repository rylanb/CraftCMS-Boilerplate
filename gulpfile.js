// Ah, Big Gulp's eh? Welp, see ya later.
var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    c             = require('chalk'),
    concat        = require('gulp-concat'),
    changed       = require('gulp-changed'),
    del           = require('del'),
    gutil         = require('gulp-util'),
    imagemin      = require('gulp-imagemin'),
    jshint        = require('gulp-jshint'),
    livereload    = require('gulp-livereload'),
    map           = require('map-stream'),
    minifycss     = require('gulp-minify-css'),
    notify        = require('gulp-notify'),
    plumber       = require('gulp-plumber'),
    pngquant      = require('imagemin-pngquant'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass'),
    scsslint      = require('gulp-scsslint'),
    sourcemaps    = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify');

// Directories
var SRC = 'public/assets',
    DIST_DIR = 'public/dist';

// JS files we'll be using
var JS = [
  SRC + '/js/*.js'
];

var VENDOR_JS = [
  SRC + '/js/vendor/*.js'
]

var IMAGE_SRC = [
  SRC + '/images/**/*'
]

// SCSS Linting, Compiling and Minification
var scssLintReporter = function(file) {
  if ( !file.scsslint.success ) {
    gutil.beep();
    notify().write({ message: file.scsslint.errorCount + ' error in scss' });

    // Loop through the warnings/errors and spit them out
    file.scsslint.results.forEach(function(result) {
      var msg =
         c.cyan(file.path) + ':' +
         c.red(result.line) + ' ' +
         ('error' === result.severity ? c.red('[E]') : c.cyan('[W]')) + ' ' +
         result.reason;
      gutil.log(msg);
    });

  } else {
    notify().write({ message: 'SCSS Linted' });
    gulp.start('styles');
  }
};


gulp.task('scss-lint', function() {
    gulp.src(SRC + '/styles/app.scss')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(scsslint({
      'config': '.scss-lint.yml'
    }));

});

gulp.task('styles', function(){
  gulp.src(SRC + '/styles/app.scss')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(
      sass({
        outputStyle: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        errLogToConsole: true,
        onSuccess: function(){
          notify().write({ message: "SCSS Compiled successfully!" });
        },
        onError: function(err) {
          gutil.beep();
          notify().write(err);
        }
      })
    )
    .pipe( sourcemaps.init() )
    .pipe( autoprefixer('last 3 versions') )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( minifycss() )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(DIST_DIR + '/styles') )
    .pipe( notify('Styles Finished') );

});

// JS Scripts
gulp.task("scripts", function() {
  return gulp.src( JS )
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe( jshint() )
    .pipe( jshint.reporter('jshint-stylish') )
    .pipe( jshint.reporter('fail') )
    .pipe( uglify() )
    .pipe( gulp.dest(DIST_DIR + '/js') )
    .pipe( notify('Scripts Finished') );
});

//Just copy over the vendor js. Don't need to jshint, uglify, etc.
gulp.task('vendor-js', function() {
  return gulp.src( VENDOR_JS )
  .pipe(plumber({
    handleError: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(gulp.dest(DIST_DIR + '/js/vendor'))
  .pipe(notify('Vendor JS Copied'));
});

// Image Minification
gulp.task('image-min', function () {
  return gulp.src( IMAGE_SRC )
    .pipe( changed(DIST_DIR + '/images') )
    .pipe( imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: true}],
        use: [pngquant()]
      })
    )
    .pipe( gulp.dest( DIST_DIR + '/images' ) )
    .pipe( notify('Images Compressed') );
});

// Fonts
gulp.task('fonts', function() {
  gulp.src(SRC + '/fonts/**/*')
  .pipe(plumber({
    handleError: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(gulp.dest(DIST_DIR + '/fonts'));
});

// Clean dist directory for rebuild
gulp.task('clean', function() {
  del(['tmp/*.js', '!tmp/unicorn.js', DIST_DIR], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});


// Do the creep, ahhhhhhh! (http://youtu.be/tLPZmPaHme0?t=7s)
gulp.task('watch', function() {

  // Listen on port 35729
  livereload.listen();

  // Watch .scss files
  gulp.watch(SRC + '/styles/**/*.scss', ['scss-lint', 'styles']);

  // Watch .js files to lint and build
  gulp.watch(SRC + '/js/**/*.js', ['scripts', 'vendor-js']);

  // Watch image files
  gulp.watch( 'public/images/**/*', ['image-min']);

});

// Gulp Default Task
gulp.task('default', ['scss-lint', 'scripts', 'vendor-js', 'fonts', 'image-min', 'watch']);
