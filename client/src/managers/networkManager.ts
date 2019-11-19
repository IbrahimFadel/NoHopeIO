import * as socketio from 'socket.io-client';

class NetworkManager {
	public io: SocketIOClient.Socket;

	public constructor() {

	}

	public connectUser() {
		console.log("Try connecting");
		this.io = socketio('http://192.168.0.12:8080');
		console.log("Tried connecting");
	}
}
