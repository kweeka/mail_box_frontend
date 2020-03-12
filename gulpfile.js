var gulp = require("gulp");
var concat = require("gulp-concat");
var inject = require("gulp-inject");
var uglify = require("gulp-uglify");
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
        html: 'www/'
    },
    src: {
        html: 'src/index.html'
    },
    watch: {
        html: 'src/index.html'
    }
};

gulp.task("html:build", function (done) {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream:true}));
    done();
});

gulp.task("project:watch", function () {
    gulp.watch(path.watch.html, gulp.series("html:build"));
});

gulp.task("project:webserver", function () {
    browser_sync(config);
});

gulp.task("project:develop", gulp.parallel("project:watch", "project:webserver"));