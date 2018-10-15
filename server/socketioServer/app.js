var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-type' : 'text/html'});
    // res.end("Hello World!");
    res.end(fs.readFileSync('./index.html', 'utf-8'));
});

// var serverPort = process.env.PORT || 3000;
var serverPort = process.env.PORT || 3000;
var serverListen = server.listen(serverPort);

var io = socketio.listen(serverListen);


io.sockets.on('connection', function(socket){
    socket.on('client_to_server', function(data){
        console.log(data.value);
        io.sockets.emit('server_to_client', {value : data.value});
    });
});

