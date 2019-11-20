//Static library for phaser usage

export default class PhaserLib {
  public static findNewPoint(location: Phaser.Math.Vector2, angle: number, distance: any): Phaser.Math.Vector2 {
    var result: Phaser.Math.Vector2 = new Phaser.Math.Vector2;

    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + location.x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + location.y);

    return result;
  }

  public static spreadChange(angle:number,spreadCone:number):number {
    var result = Math.pow((Math.random() * (spreadCone) - spreadCone/2), 3) / Math.pow(spreadCone/2,2);
    result+=angle;
    return result;
  }
}
