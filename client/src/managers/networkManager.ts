import * as socketio from 'socket.io-client';

export default class NetworkManager {
  private io: SocketIOClient.Socket;

  public constructor() {
    console.log("Called ONCE!");
    this.connectUser();
  }

  private connectUser() {
    console.log("Try connecting");
    this.io = socketio(
      'http://' + window.location.hostname + ':8080',
      {
        autoConnect: false,
        reconnection: false
      }
    );
    this.io.on('connect_error', () => {
      setTimeout(() => {
        this.connectUser();
      }, 2000);
    });
    this.io.open();
    this.io.on('connect', () => {
      console.log(this.io.connected); // true
    });
    this.io.on('disconnect', () => {
      this.io.removeAllListeners();
      this.io.close();
      this.connectUser();
    });
  }

  public sendName(name: String): void {
    this.io.emit('name', name);
  }
}
