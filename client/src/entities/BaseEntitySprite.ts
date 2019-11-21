import {EntityDirection} from './stateMembers/EntityDirection';

export default class BaseEntitySprite extends Phaser.GameObjects.Sprite {
	private currentScene: Phaser.Scene;
	private vx: number;
	private vy: number;
	private orgX: number = 24;
	private orgY: number = 20;
	private readonly spriteKey: string;
	private entityDirection: EntityDirection = EntityDirection.none;

	constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame: number) {
		super(scene, x, y, key, frame);

		this.spriteKey = key;
		this.currentScene = scene;
		this.initializeSprite();
		this.currentScene.add.existing(this);
	}

	private initializeSprite(): void {
		this.setOrigin(0);
	}

	protected getCurrentScene(): Phaser.Scene {
		return this.currentScene;
	}

	protected setEntityDirection(): void {
		if (this.vx === 0 && this.vy === 0) {
			this.entityDirection = EntityDirection.none;
		} else if (this.vx === 0 && this.vy < 0) {
			this.entityDirection = EntityDirection.up;
		} else if (this.vx === 0 && this.vy > 0) {
			this.entityDirection = EntityDirection.down;
		} else if (this.vx < 0 && this.vy === 0) {
			this.entityDirection = EntityDirection.left;
		} else if (this.vx > 0 && this.vy === 0) {
			this.entityDirection = EntityDirection.right;
		} else if (this.vx < 0 && this.vy < 0) {
			this.entityDirection = EntityDirection.upLeft;
		} else if (this.vx > 0 && this.vy < 0) {
			this.entityDirection = EntityDirection.upRight;
		} else if (this.vx < 0 && this.vy > 0) {
			this.entityDirection = EntityDirection.downLeft;
		} else if (this.vx > 0 && this.vy > 0) {
			this.entityDirection = EntityDirection.downRight;
		}
	}

	protected setDirectionalAnimation(): void {
		if (this.entityDirection != EntityDirection.none) {
			this.anims.play('walk', true);
		}
	}

	public getEntityDirection(): EntityDirection {
		return this.entityDirection;
	}

	public setVelocityX(newVX: number): void {
		this.vx = newVX;
	}

	public setVelocityY(newVY: number): void {
		this.vy = newVY;
	}

	public updatePosition(delta: number): void {
		this.x += this.vx * delta;
		this.y += this.vy * delta;
		if(this.displayOriginX!=this.orgX)
		this.displayOriginX=(this.displayOriginX-this.orgX)*(1-0.15*delta/17)+this.orgX;
	}

	public kickBack(angle: number, force: number): void {
		this.displayOriginX+=force*0.05;
		this.displayOriginX=Math.max(this.displayOriginX,this.orgX+force*0.2);
	}

	public setAnimation(config: Phaser.Animations.Types.Animation, start: number, end:number): void {
		config.frames = this.currentScene.anims.generateFrameNumbers(this.spriteKey, {start, end});
		this.currentScene.anims.create(config);
	}
}
