var http = require('http'),
httpProxy = require('http-proxy');
var servers =  ['http://127.0.0.1:8001', 'http://127.0.0.1:8002', 'http://127.0.0.1:8003'];

var proxy = httpProxy.createProxyServer();
http.createServer(function(req,res){
    loadBalanceProxy(req,res);
}).listen(8000);

var currentServer = 1;
function loadBalanceProxy(req, res){
    var cur = currentServer%servers.length;
    currentServer++;
    var target = servers[cur];
    proxy.web(req, res, {
        target: target
    });
}

//node det-server.js 8000


/*
node det-server.js 8001 &
node det-server.js 8002 &
node det-server.js 8003 &
node load-balancer.js 8000
*/

//ab -c5 -t10-k http://localhost:8000/