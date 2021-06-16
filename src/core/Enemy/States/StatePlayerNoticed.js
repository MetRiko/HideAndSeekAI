import { p5 } from "../../P5Core"

export class StatePlayerNoticed {

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = enemy.pos.copy()

		this.onLostUser = this.onLostUser.bind(this)
	}

	onLostUser() {
		// console.log(this.machine)
		console.log("User lost")
		this.machine.changeState("moveToLastSeenPlayer")
	}

	init() {
	}

	finish() {
	}

	update() {
		if (!this.enemy.playerIsInsideOrangeView) {
			this.onLostUser()
		}
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
