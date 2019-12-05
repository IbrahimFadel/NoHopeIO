import 'phaser';
var Config = Phaser.Core.Config;
export default new Config({
    type: Phaser.WEBGL,
    disableContextMenu: true,
    autoFocus: true,
    scale: {
        width: 320,
        height: 320,
        parent: "game",
        fullscreenTarget: "game",
        // zoom: 1,
        // resolution: 1,
        // parent: null,
        mode: Phaser.Scale.FIT,
        // expandParent: true,
        // autoRound: false,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
    render: {
        antialias: true,
        pixelArt: true,
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
});
//# sourceMappingURL=Config.js.map