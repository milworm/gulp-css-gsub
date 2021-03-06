# A gulp module to minify CSS class names.

![Demo](https://raw.githubusercontent.com/milworm/gulp-css-gsub/master/demo.gif)

## Introduction
Gulp-css-gsub is a gulp module that rewrites your js and css files in order to reduce file size and obfuscate your code.

## Benefits
- protection the code from stealing
- allows you find unused CSS rules it your app
- smaller size of your CSS file (up to 40% off)

## Installation
    npm install gulp-css-gsub --save-dev

## Usage
```javascript
const gulp = require("gulp");
const cssGsub = require("gulp-css-gsub");
const rename = require("gulp-rename");

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
