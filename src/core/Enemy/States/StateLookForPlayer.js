export class StateLookForPlayer {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
		this.target = null;
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
		console.log("LOOK FOR USER");
		this.enemy.lastSeenPlayerPosition = null
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
			// this.machine.changeState("lookAround");
			this.enemy.pos = this.target;
		}
	}
	finish() {
		// clearInterval(this.interval)
	}
}
