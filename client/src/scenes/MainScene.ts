import {NetworkScene} from "./NetworkScene";
import {PlayerEntity} from '../entities/PlayerEntity';

export default class MainScene extends NetworkScene {
	private player: PlayerEntity;

	constructor() {
		super({
			key: 'Main'
		});
	}

	preload(): void {
	}

	create(): void {
		this.player = new PlayerEntity(this, 100, 100, 'player', 1);
		this.player.setDisplaySize(48*2,32*2).setOrigin(0.5,0.6);
	}

	update(time: number, delta: number) {
		this.player.update(delta);
	}
}
