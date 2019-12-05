import NetworkManager from '../managers/networkManager';
import PixelatePipeline from '../entities/PixelatePipeline';
/**
 * This Scene will be used for connecting to the server, preloading assets and setting some initial values retrieved.
 */
export default class ConnectScene extends Phaser.Scene {
	private socket: NetworkManager;
	constructor(params) {
		super(params);
		this.socket = new NetworkManager();
	}

	preload() {
		this.load.spritesheet('player', 'assets/images/characters/player.png',
			{frameWidth: 47, frameHeight: 32, spacing: 1});

		this.load.spritesheet('zombie1', 'assets/images/characters/player.png',
				{frameWidth: 48, frameHeight: 32});

<<<<<<< HEAD
		this.load.image('tilesets', 'assets/images/tilesets/out.png');
		this.load.tilemapTiledJSON('maps', 'assets/maps/Town1.json');
=======

>>>>>>> a7c6cd957372d269b09e6ec4edca8d78d9a53964
	}

	create() {
		this.add.sprite(400, 300, 'phaserLogo');
		setTimeout(() => {
			this.scene.start('Main', {socket: this.socket});
		}, 300);

	}

	update() {
		//simulate connecting to server for now

	}
}
