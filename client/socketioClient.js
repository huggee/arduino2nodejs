var socketio = require('socket.io-client');
var serialPort = require('serialport');

// var socket = socketio.connect('http://localhost:3000/');
var socket = socketio.connect('http://ioserver2arduino-demo.azurewebsites.net/');

/***** detect arduino's usb port  *****/
myPort = []
serialPort.list(function(err, ports){
    ports.forEach(function(port){
        if(port.manufacturer && /arduino/.test(port.manufacturer.toLowerCase())){
            console.log(port.comName);
            myPort.push(new serialPort(port.comName, {baudRate: 115200}));
        }
    });
});

/***** open connection to server *****/
socket.on('connect', function(){
    console.log("socket connected");
});

/***** recieve "server_to_client" event      *****/
/***** (when button is cliced in index.html) *****/
socket.on('server_to_client', function(data){
    console.log(data.value);
    if(data.value == 'state1'){
        myPort[0].write('L');
        myPort[1].write('\n');
    }else if(data.value == 'state2'){
        myPort[0].write('\n');
        myPort[1].write('L');
    }else if(data.value == 'state3'){
        myPort[0].write('\n', function(e){
            myPort[0].write('U');
        });
        myPort[1].write('\n', function(e){
            myPort[1].write('U');
        });
    }
});

