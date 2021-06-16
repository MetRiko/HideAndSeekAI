import { p5 } from "../../P5Core"

export class StatePlayerNoticed {

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = enemy.pos.copy()

		this.onLostUserCallback = this.onLostUser.bind(this)
	}

	onLostUser() {
		this.machine.changeState("moveToLastSeenPlayer")
	}

	init() {
		this.enemy.getSignalController().connect("player_exited_orange_view", this.onLostUserCallback)
	}

	finish() {
		this.enemy.getSignalController().disconnect("player_exited_orange_view", this.onLostUserCallback)
	}

	update() {
	}
}
