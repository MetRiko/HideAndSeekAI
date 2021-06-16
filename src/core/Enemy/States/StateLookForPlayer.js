export class StateLookForPlayer {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
		this.target = null;
	}
	init() {
		this.target = this.enemy.lastSeenPlayerPosition.copy()
		console.log("LOOK FOR USER");
		this.enemy.lastSeenPlayerPosition = null
	}
	update() {
		const vec = this.target.copy().sub(this.enemy.pos).normalize().mult(this.moveSpeed);
		this.enemy.move(vec);
		const nextVec = this.target.copy().sub(this.enemy.pos);
		const difX = Math.sign(vec.x) !== Math.sign(nextVec.x);
		const difY = Math.sign(vec.y) !== Math.sign(nextVec.y);
		if (difX || difY) {
			this.enemy.pos = this.target;
		}
	}
	finish() {
		// clearInterval(this.interval)
	}
}
