# A gulp module to minify CSS class names.

![Demo](https://raw.githubusercontent.com/milworm/gulp-css-gsub/master/demo.gif)

[![Support](https://supporter.60devs.com/api/b/399936c021d5111d90001de85283a4b5)](https://supporter.60devs.com/give/399936c021d5111d90001de85283a4b5)

## Introduction
Gulp-css-gsub is a gulp module that rewrites your js and css files in order to reduce file size and obfuscate your code.

## Benefits
- smaller size of your CSS file (upto 40% off)
- protection the code from stealing
- allows you find unused CSS rules it your app
- less time on CSS parsing in the beginning (to be validated)

## Installation
    npm install gulp-css-gsub --save-dev

## Usage
```javascript
const gulp = require("gulp");
const cssGsub = require("gulp-css-gsub");

gulp.task("css-gsub", () => {
    return gulp.src("./dist/css/main.css")
            .pipe(cssGsub({ 
                jsIn: "./dist/js/app.js", 
                jsOut: "./dist/js/app.min.js",
                prefix: "d"
            }))
            .pipe(rename("main.min.css"))
            .pipe(gulp.dest("./dist/css"));
});
```

## Examples
[Examples](http://milworm.github.io/gulp-css-gsub/demo/index.min.html)

## Authors and Contributors
Created in 2016 by Ruslan Prytula (@milworm).
