import { p5 } from "../../P5Core";

export class StateMoveToRandomPosition {

	moveSpeed = 2.0;

	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
		this.targetPos = null;
	}
	init() {
		console.log("MOVE TO RANDOM")
		this.targetPos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
	}
	update() {
		const vec = this.targetPos.copy().sub(this.enemy.pos).normalize().mult(this.moveSpeed);
		this.enemy.move(vec);
		const nextVec = this.targetPos.copy().sub(this.enemy.pos);
		const difX = Math.sign(vec.x) !== Math.sign(nextVec.x);
		const difY = Math.sign(vec.y) !== Math.sign(nextVec.y);
		// console.log(vec, nextVec)
		if (difX || difY) {
			this.machine.changeState("lookAround");
			this.enemy.pos = this.targetPos;
		}
	}
	render(p5) {
		const vec = this.enemy.pos.copy().sub(this.targetPos).normalize().mult(15.0);
		const lineEndPos = this.targetPos.copy().add(vec);

		p5.stroke(80, 20, 20);
		p5.strokeWeight(2.0);
		p5.line(this.enemy.pos.x, this.enemy.pos.y, lineEndPos.x, lineEndPos.y);
		p5.noFill();
		p5.stroke(80, 20, 20);
		p5.strokeWeight(2.0);
		p5.circle(this.targetPos.x, this.targetPos.y, 30.0);
		p5.noStroke();
		p5.fill(80, 20, 20);
		p5.circle(this.targetPos.x, this.targetPos.y, 4.0);
	}
}
