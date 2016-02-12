# A gulp module to minify CSS class names.

![Demo](http://milworm.github.io/gulp-css-gsub/demo.gif)


[![Support](https://supporter.60devs.com/api/b/399936c021d5111d90001de85283a4b5/gulp-css-gsub)](https://supporter.60devs.com/support/399936c021d5111d90001de85283a4b5/gulp-css-gsub)

## Introduction
Gulp-css-gsub is a gulp module that rewrites your js and css files in order to reduce file size and obfuscate your code.
Here is an example. Image you have main.css and main.js files that looks like this:
    main.js

    function Layout() {
        this.html = [
            '<div class="d-container">',
                <div class="d-header-container"></div>
                <div class="d-content-container"></div>
            '</div>'
        ].join("");

        document.body.innerHTML = this.html;
    }

they use their minimized versions, like this:
    
    .ta2 {
        // ..
    }

There are few points what this is an important technique:
*   
*   
*   

## Installation
    npm install gulp-css-gsub --save-dev


## Usage
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

## Examples
[Examples](http://milworm.github.io/gulp-css-gsub/demo/index.min.html)

## Authors and Contributors
Created in 2016 by Ruslan Prytula (@milworm).
