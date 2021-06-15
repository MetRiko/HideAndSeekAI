export class StateIdle {
	constructor(machine, enemy) {
		this.interval = null;
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
		setTimeout(() => {
			this.machine.changeState("moveToRandomPosition");
		}, 2000.0);
	}
	finish() {
		clearInterval(this.interval);
	}
}
