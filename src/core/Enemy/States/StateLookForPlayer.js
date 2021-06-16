export class StateLookForPlayer {
	moveSpeed = 2.0;

	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
		// this.interval = setInterval(() => {
		// 	console.log("nice!")
		// 	this.enemy.move(p5.createVector(10.0, 0.0))
		// }, 1000.0)
		// setTimeout(() => {
		// 	this.machine.changeState(null)
		// }, 5000.0)

		this.target = this.enemy.lastSeenPlayerPosition.copy()
		this.enemy.clearLastSeenPlayerPosition()
		console.log("LOOK FOR USER");
		// this.enemy.lastSeenPlayerPosition = null
		// this.machine.changeState("idle");

	}
	update() {
		const vec = this.target.copy().sub(this.enemy.pos).normalize().mult(this.moveSpeed);
		this.enemy.move(vec);
		const nextVec = this.target.copy().sub(this.enemy.pos);
		const difX = Math.sign(vec.x) !== Math.sign(nextVec.x);
		const difY = Math.sign(vec.y) !== Math.sign(nextVec.y);
		// console.log(vec, nextVec)
		if (difX || difY) {
			console.log("tuuutaj")
			this.enemy.pos = this.target;
			this.machine.changeState("lookAround");
		}
	}
	// finish() {
	// 	// clearInterval(this.interval)
	// }

	render(p5) {
		const vec = this.enemy.pos.copy().sub(this.target).normalize().mult(15.0);
		const lineEndPos = this.target.copy().add(vec);

		p5.stroke(80, 20, 20);
		p5.strokeWeight(2.0);
		p5.line(this.enemy.pos.x, this.enemy.pos.y, lineEndPos.x, lineEndPos.y);
		p5.noFill();
		p5.stroke(80, 20, 20);
		p5.strokeWeight(2.0);
		p5.circle(this.target.x, this.target.y, 30.0);
		p5.noStroke();
		p5.fill(80, 20, 20);
		p5.circle(this.target.x, this.target.y, 4.0);
	}
}
