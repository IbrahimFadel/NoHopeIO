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
import BaseEntitySprite from './BaseEntitySprite';
var ZombieEntity = /** @class */ (function (_super) {
    __extends(ZombieEntity, _super);
    function ZombieEntity(scene, x, y, key, frame) {
        var _this = _super.call(this, scene, x, y, key, frame) || this;
        // ...
        _this.setTexture("zombie1");
        _this.tint = 0x299611;
        //this.blendMode = Phaser.BlendModes.ADD;
        _this.width = 100;
        _this.height = 100;
        return _this;
        //this.setOrigin(0.0);
    }
    ZombieEntity.prototype.Instantiate = function (location, angle, velocity) {
        this.x = location.x;
        this.y = location.y;
        //this.height = velocity;
        this.rotation = (angle + 90) * Math.PI / 180;
        var d = new Date();
        this.birthTime = d.getTime();
    };
    ZombieEntity.prototype.update = function (time, delta) {
        delta /= 17;
    };
    return ZombieEntity;
}(BaseEntitySprite));
export { ZombieEntity };
//# sourceMappingURL=ZombieEntity.js.map