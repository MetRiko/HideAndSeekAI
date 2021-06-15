export class StateLookAround {
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
		console.log("LOOK AROUND");
		this.machine.changeState("idle");
	}
	update() {
		// this.enemy.move(p5.createVector(0.4, 0.0))
	}
	finish() {
		// clearInterval(this.interval)
	}
}
