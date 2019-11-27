import * as socketio from 'socket.io-client';
import PlayerData from "./playerData";

export default class NetworkManager {
  private io: SocketIOClient.Socket;
  public data: any;
  public rand: number;

  public constructor() {
    console.log("Called ONCE!");
this.rand=Math.random();
  }

  public connectUser() {
    console.log("Try connecting");
    this.io = socketio(
      'http://' + window.location.hostname + ':10578',
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
      this.rand=Math.random();
      console.log(this.io.connected+"number="+this.rand); // true

    });
    this.io.on('data', (data: any)=> {
      this.data = data;
    });
    this.io.on('disconnect', () => {
      this.io.removeAllListeners();
      this.io.close();
      this.connectUser();
    });
  }

  public getData(): any {
    return this.data;
  }

  public sendData(data: PlayerData): void {
    this.io.emit('data', data);
  }

  public getId(): string {
    return this.io.id;
  }

  public sendName(name: String): void {
    this.io.emit('name', name);
  }
}
