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
import config from './Config';
import BootScene from './scenes/BootScene';
import ConnectScene from './scenes/ConnectScene';
import MainScene from './scenes/MainScene';
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(conf) {
        var _this = _super.call(this, conf) || this;
        _this.scene.add('Boot', BootScene);
        _this.scene.add('Connect', ConnectScene);
        _this.scene.add('Main', MainScene);
        _this.scene.start('Boot');
        return _this;
        //Phaser.Display.Canvas.CanvasInterpolation.setCrisp(this.canvas)
    }
    return Game;
}(Phaser.Game));
window.addEventListener("load", function () {
    var game = new Game(config);
});
//# sourceMappingURL=index.js.map