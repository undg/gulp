## Init
1. Clone or fork repo
```
git clone https://github.com/und3rdg/gulp.git
cd gulp
```

2. After cloning git repo first thing to do is to install all node packages
```
npm i
```

3. Delete .git directory
```
rm -rf .git
```

4. Init your own repo
```
git init
git cm -m "init"
```



## Usage
* `npm start` - run gulp in bs mode (check last lines in gulpfile.js for more info) / alias [npm run bs]
* `npm run dev` - run gulp in dev mode (without hot reload) / alias [npm run watch]
* `npm run prod` - run gulp in default mode (compile code for production)
* `npm test` - run test in watch mode
* `npm run test:once` - run test once



## GIT hooks:
* pre-commit -  run tests and compile code for production.



## Tests
* mocha/chai + few extra commonly used modules



## Modern JS/CSS
* Reactjs
* es6
* browserify with caching
* SCSS



## Legacy JS/CSS
* Bundling from object in gulpfile
* Dynamic multi tasks creation/watching


