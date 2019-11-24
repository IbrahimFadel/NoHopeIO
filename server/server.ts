//had to change the Express/Socket.io setup to be a traditional JS setup
//due to an issue with socket.io not finding its auto-route
//will work out later to convert back to TS setup
const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const port = 8080;
let tickTimer = setInterval(function(){ timer() }, 1000);

function timer() {
io.emit('data',Object.keys(io.sockets.connected).length);
}

function stopFunction() {
    clearInterval(tickTimer);
}

app.use(express.static(path.join(__dirname, '/public')));
//app.use("/bundle.js", express.static(__dirname + '/bundle.js'));
app.get( "/", ( req, res ) => {
	console.log(__dirname+"tesst");
	res.sendFile(path.join( __dirname, '/public/index.html'));
} );

io.on('connection', socket => {
  console.log('a user connected');
	console.log(Object.keys(io.sockets.connected).length)
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
	socket.on('name', event => {
		console.log(event);
	})
});



http.listen( port, () => {
	console.log( `server started at http://localhost:${ port }` );
} );
