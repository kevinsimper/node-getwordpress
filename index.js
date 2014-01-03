#!/usr/bin/env node

var unzip = require('adm-zip')
,   hyperquest = require('hyperquest')
,   fs = require('fs.extra')


var latestWordpress = 'http://wordpress.org/latest.zip';

var subfolder = '';
if(process.argv[2]){
  subfolder = '/' + process.argv[2];
  console.log('Installing Wordpress in a subfolder: .' + subfolder);
}
var finalFolder = process.cwd() + subfolder;
var wordpressZip = process.cwd() + subfolder + '/latest.zip';
fs.mkdirpSync(finalFolder);

var r = hyperquest(latestWordpress)
var zipWriteStream = fs.createWriteStream(wordpressZip);
r.pipe(zipWriteStream);

zipWriteStream.on('finish', function(){
  console.log('Finish downloading latest Wordpress');
  var files = unzip(wordpressZip);
  files.extractAllTo(finalFolder, true);
  fs.copyRecursive(finalFolder + '/wordpress/', finalFolder, function(err){
    if(err) console.log('fejl', err);
    console.log('Finish Unzipping');

    fs.rmrf(finalFolder + '/wordpress');
    fs.unlink(wordpressZip);
    console.log('Wordpress downloaded and ready!');
  });
});