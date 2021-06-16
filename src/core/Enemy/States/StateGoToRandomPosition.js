import { p5 } from "../../P5Core"

export class StateGoToRandomPosition {

	moveSpeed = 2.0

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = null

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)
	}

	onMovementToTargetFinished() {
		console.log(this.machine)
		console.log("Movement finished")
		this.machine.changeState("lookAround")
	}

	onNoticePlayer() {
		this.machine.changeState("playerNoticed")
	}

	init() {
		this.targetPos = p5.createVector(p5.random(p5.width), p5.random(p5.height))
		this.enemy.moveToPosition(this.targetPos)
		this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().connect("player_enetered_orange_view", this.onNoticePlayerCallback)
	}

	update() {
		// TODO: If orange area -> noticed
	}

	finish() {
		this.enemy.getSignalController().disconnect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().disconnect("player_enetered_orange_view", this.onNoticePlayerCallback)
	}
	
	render(p5) {
		const vec = this.enemy.pos.copy().sub(this.targetPos).normalize().mult(15.0)
		const lineEndPos = this.targetPos.copy().add(vec)

		p5.stroke(80, 20, 20)
		p5.strokeWeight(2.0)
		p5.line(this.enemy.pos.x, this.enemy.pos.y, lineEndPos.x, lineEndPos.y)
		p5.noFill()
		p5.stroke(80, 20, 20)
		p5.strokeWeight(2.0)
		p5.circle(this.targetPos.x, this.targetPos.y, 30.0)
		p5.noStroke()
		p5.fill(80, 20, 20)
		p5.circle(this.targetPos.x, this.targetPos.y, 4.0)
	}
}
