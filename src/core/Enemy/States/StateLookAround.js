export class StateLookAround {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
		console.log("LOOK AROUND");
		this.machine.changeState("idle");
	}
	update() {
		// TODO: If orange area -> noticed
	}
	finish() {
	}
}
