//引入gulp
var gulp = require("gulp"),
    spritesmith = require('gulp.spritesmith');
gulp.task('default', function() {
    return gulp.src('static/sprity/*.png') //需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png', //保存合并后图片的地址
            cssName: 'sprite.scss', //保存合并后对于css样式的地址
            padding: 5, //合并时两个图片的间距
            algorithm: 'binary-tree',
            cssTemplate: function(data) {
                var arr = [];
                data.sprites.forEach(function(sprite) {
                    arr.push(".icon-" + sprite.name +
                        "{" +
                        "background-image: url('" + sprite.escaped_image + "');" +
                        "background-position: " + sprite.px.offset_x + " " + sprite.px.offset_y + "; " +
                        "width:" + sprite.px.width + ";" +
                        "display:inline-block;" +
                        "height:" + sprite.px.height + ";" +
                        "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('src/assets/scss'));
});