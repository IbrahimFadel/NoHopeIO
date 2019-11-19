import BaseEntitySprite from './BaseEntitySprite';
import { EntityDirection } from './stateMembers/EntityDirection';



export class PlayerEntity extends BaseEntitySprite {
  private readonly PLAYER_UPDATE_RATE: number = 8;
  private readonly PLAYER_DEFAULT_SPEED: number = 0.2475;
	private cursors = {
  up: this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
  down: this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
  left: this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
  right: this.getCurrentScene().input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
};

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame: number) {
    super(scene, x, y, key, frame);
    this.createAnimations();
    //this.setupKeyboard();
    //this.setupLook();
  }

  private createAnimations(): void {
    this.setAnimation({
      key: 'walk',
      frameRate: this.PLAYER_UPDATE_RATE,
      repeat: -1
    }, 0, 10);
  }

  // private setupKeyboard(): void {
  //   this.cursors = this.getCurrentScene().input.keyboard.createCursorKeys();
  // }

  // private setupLook(): void {
  // 	this.getCurrentScene().input.on('pointermove', function (pointer) {
  //       let cursor = pointer;
  //       let angle = Phaser.Math.Angle.Between(this.x, this.y, cursor.x, cursor.y)/Math.PI*180;
  // 			this.angle = angle;
  // }, this);
  // }

  private updateLook(): void {
    let cursor = this.getCurrentScene().input.mousePointer;
    let angle = Phaser.Math.Angle.Between(this.x, this.y, cursor.x, cursor.y) / Math.PI * 180;
    this.angle = angle;
  }

  private updatePlayerVelocity(delta: number): void {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.PLAYER_DEFAULT_SPEED);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.PLAYER_DEFAULT_SPEED);
			this.kickBack(0,20);
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-this.PLAYER_DEFAULT_SPEED);
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(this.PLAYER_DEFAULT_SPEED);
    } else {
      this.setVelocityY(0);
    }
  }

  private updateAnimation(): void {
    if (this.getEntityDirection() !== EntityDirection.none) {
      this.setDirectionalAnimation();
    } else {
      this.setFrame(7);
    }
  }

  public update(delta: number): void {
    this.updateLook();
    this.updatePlayerVelocity(delta);
    this.setEntityDirection();
    this.updateAnimation();
    this.updatePosition(delta);
  }
}
