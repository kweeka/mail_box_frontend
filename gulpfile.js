var gulp = require("gulp");
var concat = require("gulp-concat");
var inject = require("gulp-inject");
var uglify = require("gulp-uglify");
var embed_templates = require("gulp-angular-embed-templates");
var prefixer = require("gulp-autoprefixer");
var sourcemaps   = require("gulp-sourcemaps");
var browser_sync = require("browser-sync");
var reload = browser_sync.reload;
var config = {
    server: {
        baseDir: "./www"
    },
    tunnel: false,
    port: 8080,
    single: true
};

var path = {
    build: {
        html: 'www/',
        js: 'www/js/'
    },
    src: {
        html: 'src/index.html',
        external_js: ['node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js'],
        internal_js: ['src/modules/mainApp.js', 'src/modules/apiModule.js', 'src/**/*.js']
    },
    watch: {
        html: 'src/index.html',
        js: ['src/**/*.js', 'src/**/*.html']
    }
};

gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(inject(gulp.src(path.build.js + "main.js"), {
            transform: function (filepath) {
                arguments[0] = (filepath + "?v=" + Date.now()).replace('/www','');
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream:true}));
});

gulp.task("external_js:build", function () {
    return gulp.src(path.src.external_js)
        .pipe(concat("external_js.js"))
        .pipe(gulp.dest(path.build.js));
});

gulp.task("internal_js:build", function () {
    return gulp.src(path.src.internal_js, {sourcemaps: true})
        .pipe(embed_templates())
        .pipe(concat("internal_js.js"))
        .pipe(gulp.dest(path.build.js, {sourcemaps: true}));
});

gulp.task("main_js:build", function () {
    return gulp.src(['www/js/external_js.js', 'www/js/internal_js.js'])
        .pipe(concat("main.js"))
        .pipe(gulp.dest(path.build.js));
});

gulp.task("project:build_js", gulp.series(gulp.parallel("external_js:build", "internal_js:build")));
gulp.task("project:build", gulp.series('project:build_js', 'main_js:build', 'html:build'));

gulp.task("project:watch", function () {
    gulp.watch(path.watch.js, gulp.series("project:build"));
    gulp.watch(path.watch.html, gulp.series("html:build"));
});

gulp.task("project:webserver", function () {
    browser_sync(config);
});

gulp.task("project:develop", gulp.parallel("project:watch", "project:webserver"));























