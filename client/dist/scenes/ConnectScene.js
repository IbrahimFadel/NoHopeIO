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
import NetworkManager from '../managers/networkManager';
/**
 * This Scene will be used for connecting to the server, preloading assets and setting some initial values retrieved.
 */
var ConnectScene = /** @class */ (function (_super) {
    __extends(ConnectScene, _super);
    function ConnectScene(params) {
        var _this = _super.call(this, params) || this;
        _this.socket = new NetworkManager();
        return _this;
    }
    ConnectScene.prototype.preload = function () {
        this.load.spritesheet('player', 'assets/images/characters/player.png', { frameWidth: 47, frameHeight: 32, spacing: 1 });
        this.load.spritesheet('zombie1', 'assets/images/characters/player.png', { frameWidth: 48, frameHeight: 32 });
        this.load.image('tilesets', 'assets/images/tilesets/out-extruded.png');
        this.load.image("mask", "https://labs.phaser.io/assets/sprites/mask1.png");
        //	https://labs.phaser.io/assets/sprites/mask1.png
        this.load.tilemapTiledJSON('maps', 'assets/maps/Town1.json');
    };
    ConnectScene.prototype.create = function () {
        var _this = this;
        this.add.sprite(400, 300, 'phaserLogo');
        setTimeout(function () {
            _this.scene.start('Main', { socket: _this.socket });
        }, 300);
    };
    ConnectScene.prototype.update = function () {
        //simulate connecting to server for now
    };
    return ConnectScene;
}(Phaser.Scene));
export default ConnectScene;
//# sourceMappingURL=ConnectScene.js.map