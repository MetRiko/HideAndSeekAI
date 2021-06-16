export class StateIdle {
	constructor(machine, enemy) {
		this.interval = null;
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
		setTimeout(() => {
			//this.machine.changeState("goToRandomPosition")
			this.machine.changeState("goToBush")
		}, 2000.0);
	}

	update() {
		// TODO: If orange area -> noticed
	}

	finish() {
		clearInterval(this.interval);
	}
}
