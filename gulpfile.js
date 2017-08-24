// 引入工具
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var minimist = require('minimist')
var gulpSequence = require('gulp-sequence')

// gulp --env production 壓縮輸出
var envOption = {
  string: 'env',
  default: { env: 'develop' }
}
var options = minimist(process.argv.slice(2), envOption);
console.log(options)
 
gulp.task('jade', function() {
  gulp.src('./source/**/*.jade')
  	.pipe($.plumber())
    .pipe($.jade())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream())
});

// SCSS
gulp.task('sass', function () {
  var plugins = [
    autoprefixer({browsers: ['last 3 version', '>5%', 'ie 8']})
  ];
  return gulp.src('./source/scss/**/*.scss')
  	.pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    // 編譯完成 css
  	.pipe($.postcss(plugins))
    // 壓縮 css // if it is production
    .pipe($.if(options.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

// JS整合
gulp.task('babel', () => {
  return gulp.src('./source/js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
        presets: ['es2015']
    }))
    .pipe($.concat('all.js'))
    // 壓縮 js // if it is production
    .pipe($.if(options.env === 'production', $.uglify({
      compress: {
        // 移除測試
        drop_console: true
      }
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
});

// 外部套件
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./.tmp/vendors'))
});

// 套件載入
gulp.task('vendorsJs', ['bower'], function() {
  return gulp.src('./.tmp/vendors/**/**.js')
    .pipe($.order([
      'jquery.js',
      'bootstrap.js',
      '**.js'
    ]))
    .pipe($.concat('vendors.js'))
    // 壓縮 js // if it is production
    .pipe($.if(options.env === 'production', $.uglify()))
    .pipe(gulp.dest('./public/js'))
})

// 建立虛擬空間
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

// 圖片壓縮
gulp.task('imagemin', () =>
    gulp.src('./source/images/*')
        .pipe($.if(options.env === 'production', $.imagemin()))
        .pipe(gulp.dest('./public/images'))
);

// 監控gulp
gulp.task('watch', function () {
  gulp.watch('./source/**/*.jade', ['jade']);
  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch('./source/js/**/*.js', ['babel']);
});

// 清除資料夾指令
gulp.task('clean', function () {
    return gulp.src(['./.tmp', './public/'], {read: false})
        .pipe($.clean());
});

// 上傳至 git
gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
});

// 完成交付 輸入 gulp bulid --env production
gulp.task('bulid', gulpSequence('clean', 'jade', 'sass', 'babel', 'vendorsJs'))

// 直接執行 開發模式 gulp
gulp.task('default', ['jade', 'sass', 'babel', 'vendorsJs', 'browser-sync', 'imagemin', 'watch']);