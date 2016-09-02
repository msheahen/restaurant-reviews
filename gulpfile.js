var gulp = require('gulp');
var gutil = require('gulp-util');

/* Let's preprocess our scss into css files!  */
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');

var postcssProcessors = [
	autoprefixer( {
		browsers: 'last 2 versions'
	} )
];

var sassFiles = 'src/styles/*.scss';

gulp.task('css', function() {
	gulp.src(sassFiles)
		// PostCSS
		.pipe(
			postcss(postcssProcessors, {syntax: scss})
		)
		// SASS to CSS
		.pipe(
			sass({ outputStyle: 'compressed' })
			.on('error', gutil.log)
		)
		.pipe(gulp.dest('dist/assets/css'));
});

/* Yay, now let's uglify our javascript! */
var uglify = require('gulp-uglify');
var jsFiles = 'src/scripts/*.js';


gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});




/*
Sweet, now we need to move our html files into dist and
*/

gulp.task('copy', function() {
    gulp.src('src/views/*.html')
        .pipe(gulp.dest('dist/'));
});

/*
serve it up!
*/
var browserSync = require('browser-sync');
gulp.task('connectWithBrowserSync', function() {
	browserSync.create();
	browserSync.init({
		server: './dist'
	});
});

/*
watch for changes in our code to we can auto-reload
*/
gulp.task('watch', function() {
	gulp.watch(sassFiles,['css']).on('change', browserSync.reload);
	gulp.watch(jsFiles,['js']).on('change', browserSync.reload);
	gulp.watch(['src/views/*.html'], ['fileinclude']).on('change', browserSync.reload);
});



/*
 gulp serve will get our page up and running!
 */
gulp.task('serve', ['connectWithBrowserSync', 'css', 'js', 'copy', 'watch']);
