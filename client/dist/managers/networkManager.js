import * as socketio from 'socket.io-client';
var NetworkManager = /** @class */ (function () {
    function NetworkManager() {
        this.lastUpdate = false;
        console.log("Called ONCE!");
        this.lastUpdate = true;
        this.rand = Math.random();
    }
    NetworkManager.prototype.connectUser = function () {
        var _this = this;
        console.log("Try connecting");
        this.io = socketio('http://' + window.location.hostname + ':10578', {
            autoConnect: false,
            reconnection: false
        });
        this.io.on('connect_error', function () {
            setTimeout(function () {
                _this.connectUser();
            }, 2000);
        });
        this.io.open();
        this.io.on('connect', function () {
            _this.rand = Math.random();
            console.log(_this.io.connected + "number=" + _this.rand); // true
        });
        this.io.on('data', function (data) {
            _this.prevData = _this.data;
            _this.data = data;
            _this.lastUpdate = true;
        });
        this.io.on('disconnect', function () {
            _this.io.removeAllListeners();
            _this.io.close();
            _this.connectUser();
        });
    };
    NetworkManager.prototype.getData = function () {
        return this.data;
    };
    NetworkManager.prototype.sendData = function (data) {
        this.io.emit('data', data);
    };
    NetworkManager.prototype.getId = function () {
        return this.io.id;
    };
    NetworkManager.prototype.sendName = function (name) {
        this.io.emit('name', name);
    };
    return NetworkManager;
}());
export default NetworkManager;
//# sourceMappingURL=networkManager.js.map