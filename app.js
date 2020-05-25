///Utitity
function Say(txt) {
    console.log(txt);
}


///Express

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    // do something here.
    res.sendFile(__dirname + '/client/index.html');
  });

app.use('/client', express.static(+__dirname + '/client'));

serv.listen(2);
console.log("Server started at port 2");

///Socket
var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
    console.log("new");
    socket.emit('UpdatedPlayerList', arrPlayers);

    //When a new player joins 
    socket.on('PlayerJoined', function(username) {
        InitPlayer(socket, username);
        RefreshPlayerListForAllPlayers();
    });
});

//Game
var arrPlayers = [];
var SOCKET_LIST = {};

function InitPlayer(socket, username){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    arrPlayers.push( {username: username} );
    Say(username + " joined");
}

function RefreshPlayerListForAllPlayers(){
    console.log(arrPlayers);
    for(var i in SOCKET_LIST) {
        socket = SOCKET_LIST[i];
        socket.emit('UpdatedPlayerList', arrPlayers);
    }
}

