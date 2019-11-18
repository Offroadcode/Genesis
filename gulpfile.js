// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');


// File paths
const files = { 
    scssPath: 'Build/assets/scss/**/*.scss',
    jsPath: 'Build/assets/js/**/*.js',
    imgSquash: 'Build/assets/images/*'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('Build/assets/production/css')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('Build/assets/production/js')
    );
}

// Optimise Images and output to production folder
function imgSquash() {
return gulp .src("Build/assets/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("Build/assets/production/images"));
}

// Watch task: watch images, SCSS and JS files for changes
// If any change, run image optimisation, scss and js tasks simultaneously
function watchTask(){
    watch([files.imgSquash, files.scssPath, files.jsPath], 
        series(
            parallel(imgSquash, scssTask, jsTask)
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously, then watch task
exports.default = series(
    parallel(imgSquash, scssTask, jsTask), 
    watchTask
);

/*gulp.task("watch", () => {
gulp.watch("Build/assets/images/*", imgSquash);
});*/