'use strict';

var staticserver = require('node-static');

var fileServer = new staticserver.Server('./dist');

console.log("push to github pages:");
console.log("git subtree push --prefix dist/ origin gh-pages");
console.log("https://gist.github.com/cobyism/4730490");
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
    	console.log(request.url,request.method);
      fileServer.serve(request, response);
    }).resume();
}).listen(8080);