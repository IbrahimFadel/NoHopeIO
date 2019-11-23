/**
 * This Scene will be used for connecting to the server, preloading assets and setting some initial values retrieved.
 */
export default class ConnectScene extends Phaser.Scene {
	constructor(params) {
		super(params);
	}

	preload() {
		this.load.spritesheet('player', 'assets/images/characters/player.png',
			{frameWidth: 48, frameHeight: 32});

		this.load.spritesheet('zombie1', 'assets/images/characters/player.png',
				{frameWidth: 48, frameHeight: 32});
	}

	create() {
		this.add.sprite(400, 300, 'phaserLogo');
		setTimeout(() => {
			this.scene.start('Main');
		}, 100);
	}

	update() {
		//simulate connecting to server for now

	}
}
