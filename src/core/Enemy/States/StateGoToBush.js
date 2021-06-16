import { p5 } from "../../P5Core"

export class StateGoToBush {

	moveSpeed = 2.0

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = null

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
	}

	onMovementToTargetFinished() {
		console.log(this.machine)
		console.log("Movement finished")
		this.machine.changeState("lookAround")
	}

	init() {
		this.targetPos = this.enemy.getCoordNearestBush()
		this.enemy.moveToPosition(this.targetPos)
		this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
	}

	update() {
		// TODO: If orange area -> noticed
	}

	finish() {
		this.enemy.getSignalController().disconnect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
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
