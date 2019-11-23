import 'phaser';
import Config = Phaser.Core.Config;

export default new Config({
	width: 800,
	height: 600,
	type: Phaser.AUTO,
	disableContextMenu: true,
	pixelArt: true,
	autoCenter: true,
	backgroundColor: "#2d2d2d",
	physics: {
      default: 'arcade',
      arcade: {
          debug: true
      }
  },
	parent: "game"
})
