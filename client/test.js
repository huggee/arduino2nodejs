var socketio = require('socket.io-client');
var serialPort = require('serialport');

// var socket = socketio.connect('http://arduinojunkapp00.azurewebsites.net/');
// var socket = socketio.connect('http://localhost:3000/');
var socket = socketio.connect('http://ioserver2arduino-demo.azurewebsites.net/');
var socket = socketio.connect('http://wsserver2arduino-demo.azurewebsites.net/');

socket.on('connect', function(){
    console.log("socket connected");
});
