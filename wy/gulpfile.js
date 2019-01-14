var gulp = require("gulp")
var webserver = require("gulp-webserver")
var sass = require("gulp-sass")
var cssmin = require("gulp-clean-css")
var uglify = require("gulp-uglify")
var concat = require("gulp-concat")

var fs = require("fs")
var path = require("path")
var url = require("url")
    //编译css
gulp.task("sass", function() {
        return gulp.src("./src/scss/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css/"))
    })
    //监听编译scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"))
})

//启服务
gulp.task("webserver", function() {
        return gulp.src("./src")
            .pipe(webserver({
                port: 3333,
                open: true,
                livereload: true,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname
                    console.log(pathname)
                    pathname = pathname == "/" ? "index.html" : pathname
                    fs.readFileSync(path.join(__dirname, "src", pathname))
                }
            }))
    })
    //在gulp中创建default任务
gulp.task("default", gulp.series("webserver", "watch", "sass"))

//压缩css
gulp.task("cssmin", function() {
        return gulp.src("./src/css/*.css")
            .pipe(cssmin())
            .pipe(gulp.dest("./build/css"))
    })
    //压缩JS合并
gulp.task("uglify", function() {
    return gulp.src("./src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"))
})