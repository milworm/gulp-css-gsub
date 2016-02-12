# A gulp module to minify CSS class names.
[![Support](https://supporter.60devs.com/api/b/399936c021d5111d90001de85283a4b5/gulp-css-gsub)](https://supporter.60devs.com/support/399936c021d5111d90001de85283a4b5/gulp-css-gsub)

![Demo](./demo.gif)

## Introduction
Gulp-css-gsub is a gulp module that rewrites your js and css files in order to reduce file size and obfuscate your code.

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
