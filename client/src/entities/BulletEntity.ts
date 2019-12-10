import PhaserLib from "../lib";
import MainScene from "../scenes/MainScene";


export default class BulletEntity extends Phaser.GameObjects.Rectangle {
  private birthTime;

    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        // ...
        this.width=1;
        this.height=4;
        this.fillAlpha=50;
        //this.alpha=255;
        this.fillColor= 0xB67E07;
        this.isFilled=true;
        this.setOrigin(0.5);

    }

    public collidesWall(): void {
      this.destroy();
    }

    public Instantiate(location:Phaser.Math.Vector2, angle:number, velocity:number): void{
      let scene: MainScene = (this.scene as MainScene);
      var tile = scene.map.getTileAtWorldXY( location.x, location.y, true, scene.cameras.main, "foreground");
      if( tile!=null&&tile.index!=-1 ) { this.collidesWall();      return;}
      this.x=location.x;
      this.y=location.y;
      this.height = velocity;
      this.rotation=(angle+90)*Math.PI/180;
      this.setDepth(2);
      var d = new Date();
this.birthTime = d.getTime();
this.scene.physics.add.existing(this);
(this.body as Phaser.Physics.Arcade.Body).setSize(5,5);
(this.body as Phaser.Physics.Arcade.Body).setOffset(2,5);
//(this.body as Phaser.Physics.Arcade.Body).onOverlap = true;
    }

    public update(time:number,delta:number): void{
      delta/=17;
      let scene: MainScene = (this.scene as MainScene);

      var tile = scene.map.getTileAtWorldXY( this.x, this.y, true, scene.cameras.main, "foreground");
      if( tile!=null&&tile.index!=-1 ) { this.collidesWall();      return;}

      //console.log(delta);
      var newLoc: Phaser.Math.Vector2;
      // newLoc = PhaserLib.findNewPoint(new Phaser.Math.Vector2(this.x,this.y),this.rotation*180/Math.PI-90,this.height*delta);
      newLoc = PhaserLib.findNewPoint(new Phaser.Math.Vector2(0,0),this.rotation*180/Math.PI-90,this.height*28);
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(newLoc.x);
      (this.body as Phaser.Physics.Arcade.Body).setVelocityY(newLoc.y);
      // this.x=newLoc.x;
      // this.y=newLoc.y;
      this.height-=0.3*delta;
      this.height*=1-0.02*delta;
      if(this.height<10){
      this.destroy();
      var d = new Date();
var n = d.getTime();
    }
    }

}
