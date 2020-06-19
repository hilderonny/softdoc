var marked = require('marked');
var fs = require('fs');
var path = require('path');

var renderer = new marked.Renderer();
marked.setOptions({ renderer: renderer });

function handleMarkDownFile(filepath, filename) {
    console.log(filepath, filename);
    var publicpath = path.join('public', filepath);
    fs.mkdirSync(publicpath, { recursive: true });
    var htmlfilename = filename.substr(0, filename.lastIndexOf('.')) + '.html';
    var htmlcontent = marked(fs.readFileSync(path.join(filepath, filename)).toString());
    fs.writeFileSync(path.join(publicpath, htmlfilename), htmlcontent);
}

function handleDirectory(dir) {
    var direntries = fs.readdirSync(dir);
    for (var direntry of direntries) {
        var fullpath = path.join(dir, direntry);
        var stat = fs.statSync(fullpath);
        if (stat.isDirectory()) {
            handleDirectory(fullpath);
        } else if (direntry.toLowerCase().endsWith('.md')) {
            handleMarkDownFile(dir, direntry);
        }
    }
}

handleDirectory('docs');