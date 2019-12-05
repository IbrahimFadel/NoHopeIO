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
import { EntityDirection } from './stateMembers/EntityDirection';
import PhaserLib from '../lib';
var BaseEntitySprite = /** @class */ (function (_super) {
    __extends(BaseEntitySprite, _super);
    function BaseEntitySprite(scene, x, y, key, frame) {
        var _this = _super.call(this, scene, x, y, key, frame) || this;
        _this.orgX = 24;
        _this.orgY = 20;
        _this.entityDirection = EntityDirection.none;
        _this.spriteKey = key;
        _this.currentScene = scene;
        _this.initializeSprite();
        _this.currentScene.add.existing(_this);
        return _this;
    }
    BaseEntitySprite.prototype.initializeSprite = function () {
        this.setOrigin(0);
    };
    BaseEntitySprite.prototype.getCurrentScene = function () {
        return this.currentScene;
    };
    BaseEntitySprite.prototype.setEntityDirection = function () {
        if (this.vx === 0 && this.vy === 0) {
            this.entityDirection = EntityDirection.none;
        }
        else if (this.vx === 0 && this.vy < 0) {
            this.entityDirection = EntityDirection.up;
        }
        else if (this.vx === 0 && this.vy > 0) {
            this.entityDirection = EntityDirection.down;
        }
        else if (this.vx < 0 && this.vy === 0) {
            this.entityDirection = EntityDirection.left;
        }
        else if (this.vx > 0 && this.vy === 0) {
            this.entityDirection = EntityDirection.right;
        }
        else if (this.vx < 0 && this.vy < 0) {
            this.entityDirection = EntityDirection.upLeft;
        }
        else if (this.vx > 0 && this.vy < 0) {
            this.entityDirection = EntityDirection.upRight;
        }
        else if (this.vx < 0 && this.vy > 0) {
            this.entityDirection = EntityDirection.downLeft;
        }
        else if (this.vx > 0 && this.vy > 0) {
            this.entityDirection = EntityDirection.downRight;
        }
    };
    BaseEntitySprite.prototype.setDirectionalAnimation = function () {
        if (this.entityDirection != EntityDirection.none) {
            this.anims.play('walk', true);
        }
    };
    BaseEntitySprite.prototype.getEntityDirection = function () {
        return this.entityDirection;
    };
    BaseEntitySprite.prototype.setVelocityX = function (newVX) {
        this.vx = newVX;
    };
    BaseEntitySprite.prototype.setVelocityY = function (newVY) {
        this.vy = newVY;
    };
    BaseEntitySprite.prototype.updatePosition = function (delta) {
        if (this.vx != 0 && this.vy != 0) {
            this.vx *= 2 / 3;
            this.vy *= 2 / 3;
        }
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        if (this.displayOriginX != this.orgX)
            this.displayOriginX = (this.displayOriginX - this.orgX) * (1 - 0.15 * delta / 17) + this.orgX;
        this.getCurrentScene().cameras.main.setZoom((this.displayOriginX - this.orgX) * 0.008 + 1);
    };
    BaseEntitySprite.prototype.kickBack = function (angle, force) {
        this.displayOriginX += force * 0.05;
        this.displayOriginX = Math.max(this.displayOriginX, this.orgX + force * 0.2);
        var knockCoord = new Phaser.Math.Vector2();
        knockCoord = PhaserLib.findNewPoint(new Phaser.Math.Vector2(0, 0), angle, -force / 12);
        this.x += knockCoord.x;
        this.y += knockCoord.y;
        this.getCurrentScene().cameras.main.shakeEffect.start(40, 0.008, true);
        //this.getCurrentScene().cameras.main.flashEffect.start(30,200,150,120,true);
    };
    BaseEntitySprite.prototype.setAnimation = function (config, start, end) {
        config.frames = this.currentScene.anims.generateFrameNumbers(this.spriteKey, { start: start, end: end });
        this.currentScene.anims.create(config);
    };
    return BaseEntitySprite;
}(Phaser.GameObjects.Sprite));
export default BaseEntitySprite;
//# sourceMappingURL=BaseEntitySprite.js.map