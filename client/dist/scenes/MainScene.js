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
import { NetworkScene } from "./NetworkScene";
import { PlayerEntity } from '../entities/PlayerEntity';
import { ZombieEntity } from '../entities/ZombieEntity';
import NetworkManager from '../managers/networkManager';
import PlayerData from "../managers/playerData";
import PhaserLib from '../lib';
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this, {
            key: 'Main',
        }) || this;
        _this.timeStamp = 0;
        return _this;
    }
    MainScene.prototype.init = function () {
        this.socket = new NetworkManager();
        this.socket.connectUser();
    };
    MainScene.prototype.preload = function () {
        this.socket.sendName("Siir Raum");
    };
    MainScene.prototype.create = function () {
        var map = this.make.tilemap({ key: 'maps' });
        var tileset = map.addTilesetImage('cybernoid', 'tilesets');
        var layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        layer.setScale(1);
        this.times = new Array();
        this.angles = new Array();
        this.player = new PlayerEntity(this, 100, 100, 'player', 1);
        this.player.setDisplaySize(48 * 1, 32 * 1).setOrigin(0.5, 0.624).setScale(1.1);
        this.cameras.main.startFollow(this.player.offsetLocation, true, 0.03, 0.03, 0, 0);
        this.cameras.main.alpha = 1;
        this.cameras.main.setZoom(0.4);
        var spotlight = this.make.sprite({
            x: 160,
            y: 160,
            key: 'mask',
            add: false
        });
        var test;
        test.setb;
        this.cameras.main.setMask(spotlight);
        this.enemyZombies = this.add.group({ classType: ZombieEntity, runChildUpdate: true });
        var zombie = this.enemyZombies.get();
        zombie.Instantiate(new Phaser.Math.Vector2(200, 200), 180, 0);
        zombie.setDisplaySize(48 * 1, 32 * 1).setOrigin(0.2, 0.1).setScale(1);
        this.tweens.add({
            targets: this.player,
            scale: 1.05,
            ease: 'Quad.easeInOut',
            duration: 500,
            paused: false,
            loop: -1,
            yoyo: true
        });
        // zombie.tween = this.tweens.add({
        //         targets: zombie,
        //         x: zombie.x,
        //         y: zombie.y,
        //         ease: 'Sine.easeIn',
        //         duration: 200,
        //         paused: false,
        // 				loop: 0
        //     });
        console.log(zombie);
        console.log("zombie");
    };
    MainScene.prototype.update = function (time, delta) {
        var _this = this;
        this.player.update(delta);
        this.cameras.main.setRotation(Math.sin(this.player.y / 200) / 12 + Math.cos(this.player.x / 200) / 12);
        //if(time%10==1)
        if (this.socket.lastUpdate == true) {
            this.socket.lastUpdate = false;
            this.timeStamp = Date.now();
            if (this.socket.getData() != undefined)
                Object.keys(this.socket.getData()).forEach(function (id) {
                    if (id != _this.socket.getId()) {
                        if (_this.socket.prevData != undefined && _this.socket.prevData[id] != undefined) {
                            if (_this.times[id] == undefined || _this.angles[id] == undefined) {
                                _this.times[id] = 0;
                                _this.angles[id] = 0;
                            }
                            if (_this.socket.getData()[id].rotation != _this.socket.prevData[id].rotation) {
                                _this.enemyZombies.getLast(true).tweenRotation = _this.tweens.add({
                                    targets: _this.enemyZombies.getLast(true),
                                    rotation: _this.socket.getData()[id].rotation,
                                    ease: 'Quad.easeOut',
                                    duration: 40,
                                    paused: false,
                                    loop: 0
                                });
                            }
                            if (_this.socket.getData()[id].x != _this.socket.prevData[id].x || _this.socket.getData()[id].y != _this.socket.prevData[id].y) {
                                _this.times[id]++;
                                var predPoint = new Phaser.Math.Vector2(_this.socket.getData()[id].x, _this.socket.getData()[id].y);
                                var angle = Phaser.Math.Angle.Between(_this.socket.prevData[id].x, _this.socket.prevData[id].y, predPoint.x, predPoint.y);
                                if (Math.floor(_this.angles[id]) != Math.floor(angle))
                                    _this.times[id] /= 3;
                                _this.times[id] = Math.min(15, _this.times[id]);
                                predPoint = PhaserLib.findNewPoint(predPoint, angle * 180 / Math.PI, Math.min(_this.times[id], Phaser.Math.Distance.Squared(predPoint.x, predPoint.y, _this.socket.prevData[id].x, _this.socket.prevData[id].y)));
                                _this.enemyZombies.getLast(true).tween = _this.tweens.add({
                                    targets: _this.enemyZombies.getLast(true),
                                    x: predPoint.x,
                                    y: predPoint.y,
                                    ease: 'Power0',
                                    duration: 100,
                                    paused: false,
                                    loop: 0
                                });
                                // this.enemyZombies.getLast(true).tween.updateTo('x', this.socket.getData()[id].x, true);
                                // this.enemyZombies.getLast(true).tween.updateTo('y', this.socket.getData()[id].y, true);
                                // this.enemyZombies.getLast(true).tween.play();
                                _this.angles[id] = angle;
                            }
                            else {
                                if (_this.times[id] < 5) {
                                    _this.enemyZombies.getLast(true).tween = _this.tweens.add({
                                        targets: _this.enemyZombies.getLast(true),
                                        x: _this.socket.getData()[id].x,
                                        y: _this.socket.getData()[id].y,
                                        ease: 'Power0',
                                        duration: 75,
                                        paused: false,
                                        loop: 0
                                    });
                                }
                                _this.times[id] = 0;
                            }
                        }
                        //this.enemyZombies.getLast(true).x=this.socket.getData()[id].x;
                        //	this.enemyZombies.getLast(true).y=this.socket.getData()[id].y;
                        _this.enemyZombies.getLast(true).rotation = _this.socket.getData()[id].rotation;
                    }
                });
            this.socket.sendData(new PlayerData("Raums", this.player.x, this.player.y, this.player.rotation));
        }
    };
    return MainScene;
}(NetworkScene));
export default MainScene;
//# sourceMappingURL=MainScene.js.map