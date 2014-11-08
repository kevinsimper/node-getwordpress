#!/usr/bin/env node

var fs = require('fs.extra')
,   Download = require('download')
,   progress = require('download-status')
,   path = require('path');

var latestWordpress = 'https://wordpress.org/latest.zip';
var subfolder = '';

if(process.argv[2]) {
  subfolder = path.join('./' + process.argv[2]);
  console.log('Installing Wordpress in a subfolder: ./' + subfolder);
} else {
  console.log('Installing Wordpress in current directory.');
}

var finalFolder = path.join(process.cwd(), subfolder);
fs.mkdirpSync(finalFolder);

var download = new Download({
  extract: true,
  strip: 1
});

download
  .get(latestWordpress)
  .dest(finalFolder)
  .use(progress());

download.run(function (err, files, stream) {
  if (err) return console.log('Error', err);
  console.log('Wordpress downloaded and ready!');
});
