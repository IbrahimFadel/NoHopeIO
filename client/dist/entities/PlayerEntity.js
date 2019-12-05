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
import { EntityDirection } from './stateMembers/EntityDirection';
import BulletEntity from './BulletEntity';
import PhaserLib from '../lib';
var PlayerEntity = /** @class */ (function (_super) {
    __extends(PlayerEntity, _super);
    function PlayerEntity(scene, x, y, key, frame) {
        var _this = _super.call(this, scene, x, y, key, frame) || this;
        _this.PLAYER_UPDATE_RATE = 8;
        _this.PLAYER_DEFAULT_SPEED = 0.1475;
        _this.isShooting = false;
        _this.updateIteration = 30;
        _this.positionIncrement = new Phaser.Math.Vector2();
        _this.previousAngle = 0;
        _this.offsetLocation = new Phaser.GameObjects.Shape(_this.getCurrentScene(), "reticle");
        _this.cursors = {
            up: _this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: _this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: _this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: _this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
        _this.createAnimations();
        _this.playerBullets = _this.getCurrentScene().add.group({ classType: BulletEntity, runChildUpdate: true });
        _this.randomSync = new PhaserLib.Random(123);
        //this.bulletTest = new Phaser.GameObjects.Rectangle(this.getCurrentScene(),300,300,100,100,0xFF0000,255);
        //this.getCurrentScene().add.existing(this.bulletTest);
        //this.bulletTest.setActive(true);
        _this.setupShoot();
        return _this;
        //this.setupKeyboard();
        //this.setupLook();
    }
    PlayerEntity.prototype.createAnimations = function () {
        this.setAnimation({
            key: 'walk',
            frameRate: this.PLAYER_UPDATE_RATE,
            repeat: -1
        }, 0, 10);
    };
    // private setupKeyboard(): void {
    //   this.cursors = this.getCurrentScene().input.keyboard.createCursorKeys();
    // }
    PlayerEntity.prototype.setupShoot = function () {
        this.getCurrentScene().input.on('pointerdown', function (pointer) {
            this.isShooting = true;
            this.getCurrentScene().game.input.mouse.requestPointerLock();
            console.log(this.randomSync.nextNumber() + 1);
        }, this);
        this.getCurrentScene().input.on('pointerup', function (pointer) {
            this.isShooting = false;
        }, this);
        this.getCurrentScene().input.on('pointermove', function (pointer) {
            //this.updateIteration--;
            if (Phaser.Math.Distance.Squared(0, 0, this.positionIncrement.x + pointer.movementX, this.positionIncrement.y + pointer.movementY) < 2000) {
                this.positionIncrement.x += pointer.movementX;
                this.positionIncrement.y += pointer.movementY;
            }
            else {
                this.positionIncrement = PhaserLib.findNewPoint(this.positionIncrement, Phaser.Math.Angle.Between(0, 0, this.positionIncrement.x, this.positionIncrement.y) / Math.PI * 180, -4);
            }
            this.rotation = Phaser.Math.Angle.Between(0, 0, this.positionIncrement.x, this.positionIncrement.y);
            // if(this.updateIteration<0){
            //       //if (!this.getCurrentScene().game.input.mouse.locked)
            //       {
            //
            //           let angle = Phaser.Math.Angle.Between(0, 0, this.positionIncrement.x, this.positionIncrement.y);
            //           this.positionIncrement.x=0;
            //           this.positionIncrement.y=0;
            //           //this.angle=angle/Math.PI*180
            //           console.log((angle/Math.PI*180-this.previousAngle/Math.PI*180))
            //           if(((angle/Math.PI*180-this.previousAngle/Math.PI*180)<180&&(angle/Math.PI*180-this.previousAngle/Math.PI*180)>-180))
            //           this.angle = (this.previousAngle/Math.PI*180+angle/Math.PI*180)/2;
            //           else
            //           this.angle = -((360-this.previousAngle/Math.PI*180-angle/Math.PI*180)/2+this.previousAngle/Math.PI*180)+180;
            //
            //           this.previousAngle=angle;
            //       }
            //       this.updateIteration = 10;
            //     }
        }, this);
    };
    PlayerEntity.prototype.fireBullet = function () {
        if (this.playerBullets.getLast(true) != null && (this.playerBullets.getLast(true).height > 24 || this.playerBullets.getLast(true).height == 6))
            return;
        var location = new Phaser.Math.Vector2(this.x, this.y);
        var velocity = 29;
        var angle = this.rotation * 180 / Math.PI;
        var bullet = this.playerBullets.get();
        bullet.setActive(true).setVisible(true);
        location = PhaserLib.findNewPoint(location, angle, 35);
        angle = PhaserLib.spreadChange(angle, 15);
        this.kickBack(angle, velocity);
        bullet.Instantiate(location, angle, velocity);
        //bullet.fire(this,this.getCurrentScene().input.mousePointer);
    };
    PlayerEntity.prototype.updateLook = function () {
        //let cursor = this.getCurrentScene().input.mousePointer;
        //let angle = Phaser.Math.Angle.Between(this.x, this.y, cursor.x, cursor.y) / Math.PI * 180;
        var offset = (-(this.displayOriginX - 24) * 0.2 + 1) * 60;
        if (this.getEntityDirection() != EntityDirection.none) {
            offset *= 0.15;
        }
        var coords = PhaserLib.findNewPoint(new Phaser.Math.Vector2(this.x, this.y), this.rotation * 180 / Math.PI, offset);
        this.offsetLocation.x = coords.x;
        this.offsetLocation.y = coords.y;
        //this.angle = angle;
    };
    PlayerEntity.prototype.updatePlayerVelocity = function (delta) {
        var velocity = this.PLAYER_DEFAULT_SPEED;
        if (this.playerBullets.getLast(true) != null)
            velocity *= 12 / this.playerBullets.getLast(true).height;
        if (this.cursors.left.isDown) {
            this.setVelocityX(-velocity);
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(velocity);
        }
        else {
            this.setVelocityX(0);
        }
        if (this.cursors.up.isDown) {
            this.setVelocityY(-velocity);
        }
        else if (this.cursors.down.isDown) {
            this.setVelocityY(velocity);
        }
        else {
            this.setVelocityY(0);
        }
    };
    PlayerEntity.prototype.updateAnimation = function () {
        if (this.getEntityDirection() !== EntityDirection.none) {
            this.setDirectionalAnimation();
        }
        else {
            this.setFrame(7);
        }
    };
    PlayerEntity.prototype.update = function (delta) {
        if (this.isShooting) {
            this.fireBullet();
        }
        this.updateLook();
        this.updatePlayerVelocity(delta);
        this.setEntityDirection();
        this.updateAnimation();
        this.updatePosition(delta);
    };
    return PlayerEntity;
}(BaseEntitySprite));
export { PlayerEntity };
//# sourceMappingURL=PlayerEntity.js.map