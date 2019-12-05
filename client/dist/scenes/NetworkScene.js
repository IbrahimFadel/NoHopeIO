// import * as socketio from 'socket.io-client';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NetworkScene = /** @class */ (function (_super) {
    __extends(NetworkScene, _super);
    // public io: SocketIOClient.Socket;
    function NetworkScene(key) {
        return _super.call(this, key) || this;
        // this.io = socketio('http://localhost:8080');
    }
    return NetworkScene;
}(Phaser.Scene));
export { NetworkScene };
//# sourceMappingURL=NetworkScene.js.map