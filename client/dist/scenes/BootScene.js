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
/**
 * The basic preload Scene. Keep this Scene lightweight and only preload what is needed for a loading screen.
 */
var BootScene = /** @class */ (function (_super) {
    __extends(BootScene, _super);
    function BootScene(params) {
        return _super.call(this, params) || this;
    }
    BootScene.prototype.preload = function () {
        this.load.image('phaserLogo', 'assets/images/phaser.png');
    };
    BootScene.prototype.create = function () {
        this.scene.start('Connect');
    };
    return BootScene;
}(Phaser.Scene));
export default BootScene;
//# sourceMappingURL=BootScene.js.map