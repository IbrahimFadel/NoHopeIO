import 'phaser';
import Config = Phaser.Core.Config;

export default new Config({
	type: Phaser.AUTO,
	disableContextMenu: true,
	scale: {
    width: 1024,
    height: 768,
    // zoom: 1,
    // resolution: 1,
    // parent: null,
    // mode: Phaser.Scale.NONE,
    // expandParent: true,
    // autoRound: false,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    // resizeInterval: 500,
    // fullscreenTarget: null,
    // min: {
    //   width: 0,
    //   height: 0
    // },
    // max: {
    //   width: 0,
    //   height: 0
    // }
  },
	render: {
    antialias: true,
    pixelArt: true,
    roundPixels: false,
    transparent: false,
    clearBeforeRender: true,
    premultipliedAlpha: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "default",
    batchSize: 2000,
    maxLights: 10
  },
	backgroundColor: "#2d2d2d",
	physics: {
      default: 'arcade',
      arcade: {
          debug: true
      }
  },
	parent: "game"
})
