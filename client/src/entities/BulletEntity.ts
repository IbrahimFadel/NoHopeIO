import PhaserLib from "../lib";


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

    public Instantiate(location:Phaser.Math.Vector2, angle:number, velocity:number): void{
      this.x=location.x;
      this.y=location.y;
      this.height = velocity;
      this.rotation=(angle+90)*Math.PI/180;
      var d = new Date();
this.birthTime = d.getTime();
    }

    public update(time:number,delta:number): void{
      delta/=17;
      var newLoc: Phaser.Math.Vector2;
      newLoc = PhaserLib.findNewPoint(new Phaser.Math.Vector2(this.x,this.y),this.rotation*180/Math.PI-90,this.height*delta);
      this.x=newLoc.x;
      this.y=newLoc.y;
      this.height-=0.3*delta;
      this.height*=1-0.02*delta;
      if(this.height<10){
      this.destroy();
      var d = new Date();
var n = d.getTime();
    }
    }

}
