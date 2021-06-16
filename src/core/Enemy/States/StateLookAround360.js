export class StateLookAround360 {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;

		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)
	}
	
	onNoticePlayer() {
		this.machine.changeState("playerNoticed")
	}

	init() {
		this.enemy.getSignalController().connect("player_enetered_orange_view", this.onNoticePlayerCallback)

		// this.machine.changeState("goToBush");
	}
	
	update() {
	}

	finish() {
		this.enemy.getSignalController().disconnect("player_enetered_orange_view", this.onNoticePlayerCallback)
	}
}
