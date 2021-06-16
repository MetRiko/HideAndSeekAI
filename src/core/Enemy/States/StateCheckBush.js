import { p5 } from "../../P5Core"

export class StateCheckBush {

	moveSpeed = 2.0

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = null

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
	}

	onMovementToTargetFinished() {
		console.log(this.machine)
	}

	init() {
        this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)

		const bush = this.enemy.getNearestBush()
        if(bush.player_inside == true) {
            this.machine.changeState("catched")
        }
        else {
            this.machine.changeState("idle")
        }
	}

	update() {
	}

	finish() {
        this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}
}
