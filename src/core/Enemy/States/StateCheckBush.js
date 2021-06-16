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
	}
}
