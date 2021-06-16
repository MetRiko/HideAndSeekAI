import * as Tween from "@tweenjs/tween.js"
import { p5 } from "../../P5Core"

export class StateGoToBush {

	moveSpeed = 2.0

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
	}

	onMovementToTargetFinished() {
		console.log(this.machine)
		console.log("Movement finished")
		this.machine.changeState("checkBush")
	}

	init() {
		this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
        this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)
        this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)

		const bush = this.enemy.getNearestBush()
		const targetPos = p5.createVector(bush.position.x, bush.position.y)

		const forwardVec = this.enemy.getForwardVector()
		const targetVec = targetPos.copy().sub(this.enemy.getPosition())

		const deltaAngle = forwardVec.angleBetween(targetVec)

		const startAngle = this.enemy.getRotation()
		const endAngle = startAngle + deltaAngle

		new Tween.Tween({value: startAngle})
			.to({value: endAngle}, 1000.0)
			.easing(Tween.Easing.Sinusoidal.InOut)
			.onUpdate(({value}) => this.enemy.setRotation(value))
			.onComplete(({value}) => {
				this.enemy.setRotation(value)
				this.enemy.moveToPosition(targetPos)
			})
			.start()
	}

	update() {
		// TODO: If orange area -> noticed
	}

	finish() {
        this.enemy.getSignalController().disconnect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
        this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}
}
