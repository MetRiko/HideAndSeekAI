import * as Tween from "@tweenjs/tween.js"
import { p5 } from "../../P5Core"

export class StateGoToRandomPosition {

	moveSpeed = 2.0

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		// this.targetPos = null

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)
	}

	onMovementToTargetFinished() {
		this.machine.changeState("lookAround")
	}

	// init() {
	// 	this.targetPos = p5.createVector(p5.random(p5.width), p5.random(p5.height))
	// 	this.enemy.moveToPosition(this.targetPos)
	// 	this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
	// }
	
	onNoticePlayer() {
		console.log("X")
		this.machine.changeState("playerNoticed")
	}

	init() {
		this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)

		const randomPos = p5.createVector(p5.random(p5.width), p5.random(p5.height))
		const moveVec = randomPos.copy().sub(this.enemy.getPosition())
		const enemyVec = this.enemy.getForwardVector()
		const enemyRot = p5.createVector(1.0, 0.0).angleBetween(enemyVec)
		const deltaAngle = enemyVec.angleBetween(moveVec)

		new Tween.Tween({value: enemyRot})
			.to({value: enemyRot + deltaAngle}, 500.0)
			.easing(Tween.Easing.Sinusoidal.InOut)
			.onUpdate(({value}) => this.enemy.setRotation(value))
			.onComplete(({value}) => {
				this.enemy.setRotation(value)
				this.enemy.moveToPosition(randomPos)
			})
			.start()
	}

	update() {
		// TODO: If orange area -> noticed
	}

	finish() {
		this.enemy.getSignalController().disconnect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
	}
}
