var args = process.argv.splice(2);
var http = require('http');
var math = require('mathjs');

function matrixDet() {
    var matrix = [];
    var size = 150;
    
    for(var i=0; i<size; i++) {
        matrix[i] = new Array(size);
    }
    for(var i=0; i<size; i++) {
        for(var j=0; j<size; j++) {
            matrix[i][j] = Math.floor(Math.random()*10);
        }
    } 

    return math.det(matrix);
}

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Det: ' + matrixDet());
});

server.listen(args[0] || 8000);
