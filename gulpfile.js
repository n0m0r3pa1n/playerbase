var gulp = require("gulp");
var babel = require("gulp-babel");
var gutil = require("gulp-util");

gulp.task("default", function() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .on("error", function (err) {
            var displayErr = gutil.colors.red(err);
            gutil.log(displayErr);
            gutil.beep();
            this.emit("end");
        })
        .pipe(gulp.dest("build"));
});

var watcher = gulp.watch('src/**/*.js', ['default']);

watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});