var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use('/sfx',express.static(path.join(__dirname, 'sfx')));
app.use('/assets',express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

	socket.on('sf', function(msg) {
    console.log('sf: ' + msg.sf);
		socket.broadcast.emit('sf', msg);
  });

  socket.on('stop', function() {
    socket.broadcast.emit('stop');
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});