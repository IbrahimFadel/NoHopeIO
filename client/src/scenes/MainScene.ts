import {NetworkScene} from "./NetworkScene";
import {PlayerEntity} from '../entities/PlayerEntity';
import {ZombieEntity} from '../entities/ZombieEntity';
import NetworkManager from '../managers/networkManager';

export default class MainScene extends NetworkScene {
private enemyZombies: any;
	private player: PlayerEntity;
	private socket: NetworkManager;

	constructor(data) {
		super({
			key: 'Main',
		});
	}

	init(data): void {
		this.socket = data.socket;
	}

	preload(): void {
		this.socket.sendName("Sir Raum");
	}

	create(): void {
		this.player = new PlayerEntity(this, 100, 100, 'player', 1);
		this.player.setDisplaySize(48*2,32*2).setOrigin(0.5,0.624);
this.enemyZombies = this.add.group({ classType: ZombieEntity as any, runChildUpdate: true });
		let zombie = this.enemyZombies.get();
zombie.Instantiate(new Phaser.Math.Vector2(200,200),180,0);
console.log("zombie")
	}

	update(time: number, delta: number) {
		this.player.update(delta);
	}
}
