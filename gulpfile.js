var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS   	 = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),
		rigger		 = require('gulp-rigger'),
		imagemin	 = require('gulp-imagemin');
gulp.task('browser-sync', ['html','styles', 'scripts','images'], function() {
		browserSync.init({
				server: {
						baseDir: "./build"
				},
				notify: false
		});
});
gulp.task('styles', function () {
	return gulp.src('src/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*')
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});
gulp.task('images', function(){
	gulp.src('src/img/**/*.*')
	  .pipe(imagemin())
      .pipe(gulp.dest('build/img'))
});
gulp.task('watch', function () {
	gulp.watch('src/sass/*.sass', ['styles']);
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/img/**/*.*',['images']);
	gulp.watch('src/js/*.js').on("change", browserSync.reload);
	gulp.watch('build/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
