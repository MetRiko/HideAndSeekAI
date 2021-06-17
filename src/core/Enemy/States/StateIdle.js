export class StateIdle {
	constructor(machine, enemy) {
		this.interval = null;
		this.machine = machine;
		this.enemy = enemy;

		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)
		this.onCatchUserCallback = this.onCatchUser.bind(this)
	}
	init() {
		this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)

		setTimeout(() => {
			this.machine.changeState("goToRandomPosition")
		}, 2000.0);
	}

	onNoticePlayer() {
		this.machine.changeState("playerNoticed")
	}

	onCatchUser() {
		this.machine.changeState("catched")
	}

	update() {
		// TODO: If orange area -> noticed
	}

	finish() {
		clearInterval(this.interval);
		this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}
}
