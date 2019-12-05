import 'phaser';
import Config = Phaser.Core.Config;

export default new Config({
	type: Phaser.WEBGL,
	disableContextMenu: true,
	autoFocus: true,
	scale: {
    width: 256,
    height: 256,
		parent: "game",
		fullscreenTarget: "game",
    // zoom: 1,
    // resolution: 1,
    // parent: null,
    mode: Phaser.Scale.FIT,
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

    antialias: false,
    pixelArt: false,
    roundPixels: false,
    transparent: false,
    clearBeforeRender: true,
    premultipliedAlpha: false,
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
