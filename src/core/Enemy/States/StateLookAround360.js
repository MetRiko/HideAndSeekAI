export class StateLookAround360 {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
		console.log("LOOK AROUND 360");
		this.machine.changeState("idle");
	}
	update() {
		// TODO: If orange area -> noticed
	}
	finish() {
	}
}
