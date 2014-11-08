#!/usr/bin/env node

var fs = require('fs.extra')
,   Download = require('download')
,   progress = require('download-status');

var latestWordpress = 'http://wordpress.org/latest.zip';
var subfolder = '';
if(process.argv[2]){
  subfolder = '/' + process.argv[2];
  console.log('Installing Wordpress in a subfolder: .' + subfolder);
} else {
  console.log('Installing Wordpress in current directory.')
}
var finalFolder = process.cwd() + subfolder;
fs.mkdirpSync(finalFolder);

var download = new Download({
    extract: true,
    strip  : 1
})
    .get(latestWordpress)
    .dest(finalFolder)
    .use(progress());

download.run(function (err, files, stream) {
    if (err) {
        console.log('fejl', err);
    } else {
        console.log('Wordpress downloaded and ready!');
    }
});
