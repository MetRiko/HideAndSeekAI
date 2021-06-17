import { p5 } from "../../P5Core"

export class StatePlayerNoticed {

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = enemy.pos.copy()

		this.onLostUserCallback = this.onLostUser.bind(this)
		this.onCatchUserCallback = this.onCatchUser.bind(this)
	}

	onLostUser() {
		// setTimeout(() => {
			this.machine.changeState("goToLastSeenPlayer")
		// }, 1000.0);
	}

	onCatchUser() {
		this.machine.changeState("catched")
	}

	init() {
		this.machine.changeState("goToLastSeenPlayer")
		// this.enemy.getSignalController().connect("player_entered_orange_view", this.onLostUserCallback)
		// this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)
	}

	finish() {
		// this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onLostUserCallback)
		// this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}

	update() {
	}
}
