var socketio = require('socket.io-client');
var serialPort = require('serialport');

// var socket = socketio.connect('http://arduinojunkapp00.azurewebsites.net/');
// var socket = socketio.connect('http://localhost:3000/');
var socket = socketio.connect('http://ioserver2arduino-demo.azurewebsites.net/');

socket.on('connect', function(){
    console.log("socket connected");
});

myPort = []
serialPort.list(function(err, ports){
    ports.forEach(function(port){
        if(port.manufacturer && /arduino/.test(port.manufacturer.toLowerCase())){
            console.log(port.comName);
            myPort.push(new serialPort(port.comName, {baudRate: 115200}));
        }
    });
});

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

// // myPort = []
// // serialPort.list(function(err, ports){
// //     ports.forEach(function(port){
// //         if(port.manufacturer && /arduino/.test(port.manufacturer.toLowerCase())){
// //             myPort.push(new serialPort(port.comName, {baudRate: 115200}));
// //         }
// //     });
// // });
// 
// io.sockets.on('connection', function(socket){
//     socket.on('client_to_server', function(data){
//         console.log(data.value);
//         console.log(myPort.length);
//         io.sockets.emit('server_to_client', {value : data.value});
//         // if(data.value == 'state1'){
//         //     myPort[0].write('L');
//         //     myPort[1].write('\n');
//         // }else if(data.value == 'state2'){
//         //     myPort[0].write('\n');
//         //     myPort[1].write('L');
//         // }
//     });
// });
// 
