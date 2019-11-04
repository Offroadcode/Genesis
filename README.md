# GENESIS

This starter kit is an internal tool for use by the Offroadcode team and helps set a few base tasks and styles up as well as creating the start of a folder structure we use on our projects. 

## Getting started 

Genesis uses Sass for CSS and Gulp as a task runner, please ensure you have both these installed and running in your local environment before use. 

Your local dev environment probably already has this stuff installed anyway but it might be worth checking if everything is there.

* Ruby
* Sass
* Node.js
* Gulp

We're currently using Gulp for our task management and there are some standard tasks set up in the `gulpfile.js` config in the root folder but you're welcome to add to them on a per project basis if you need other jobs doing beyond what's there. 

## Gulp tasks

### JS Minify & Concatenation

If you need to add new JS files to the project, simply drop them into `/js/app/` if it's code we've written and if it's 3rd party JS (plugins, widgets etc) they go in the `/js/libs/` folder. Gulp will watch, minify and concatenate everything into the build folder.

You don't need to reference them in the HTML, Gulp will run the task and compile them all into `/js/build/production.js`. 

The `/js/build/production.js` file is then minified into `/js/build/production.min.js` which is what you should reference in your HTML template above the closing `</body>` tag.

### Image optimisation

All images should be saved into the `/assets/img-raw/` folder. Gulp monitors this folder and optimises all the images in here and then copies them into `/assets/img/` - It is the images in the `img` folder you should reference in your template code.

## SVG optimisation

Gulp runs an SVG optimisation task on any file with the svg extension and merges them into a single sprite which from which you can reference individiual SVG ID's. This is compiled and saved into a file called `icon-sprite.svg` in the `/img/` folder.

### Sass compilation

All files in `/assets/scss/` are automatically compiled and minified and then output to `/assets/css/screen.css` which is referenced in the HTML.

Do not under any circumstances edit `/assets/css/screen.css`, any changes you make will be lost next time Sass is compiled.

If you need to add a new scss file for some reason, you can do so by creating a `_yourfilename.scss` file (the underscore is needed) and you can then reference that in `/assets/scss/screen.scss` and it'll compile next time Gulp runs.

Any file created in `/assets/scss/` (including sub folders) is watched and compiled as long as you reference it in the `screen.scss` file.

### CSS Prefixing

You don't need to include browser specific prefixing for properties, they're automatically added when Gulp compiles the Sass so just add un-prefixed properties and if they're needed it's taken care of. You can specify the browsers you're targeting in the top of the Gulp file and it will generate the relevant prefixes. 

## Gulp Tasks

* `gulp watch` - Watch, compile, concatenate for JS and Sass