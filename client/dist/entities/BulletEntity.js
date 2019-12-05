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
import PhaserLib from "../lib";
var BulletEntity = /** @class */ (function (_super) {
    __extends(BulletEntity, _super);
    function BulletEntity(scene, x, y, width, height, fillColor) {
        var _this = _super.call(this, scene, x, y, width, height, fillColor) || this;
        // ...
        _this.width = 1;
        _this.height = 4;
        _this.fillAlpha = 50;
        //this.alpha=255;
        _this.fillColor = 0xB67E07;
        _this.isFilled = true;
        _this.setOrigin(0.5);
        return _this;
    }
    BulletEntity.prototype.Instantiate = function (location, angle, velocity) {
        this.x = location.x;
        this.y = location.y;
        this.height = velocity;
        this.rotation = (angle + 90) * Math.PI / 180;
        var d = new Date();
        this.birthTime = d.getTime();
    };
    BulletEntity.prototype.update = function (time, delta) {
        delta /= 17;
        var newLoc;
        newLoc = PhaserLib.findNewPoint(new Phaser.Math.Vector2(this.x, this.y), this.rotation * 180 / Math.PI - 90, this.height * delta);
        this.x = newLoc.x;
        this.y = newLoc.y;
        this.height -= 0.3 * delta;
        this.height *= 1 - 0.02 * delta;
        if (this.height < 10) {
            this.destroy();
            var d = new Date();
            var n = d.getTime();
        }
    };
    return BulletEntity;
}(Phaser.GameObjects.Rectangle));
export default BulletEntity;
//# sourceMappingURL=BulletEntity.js.map