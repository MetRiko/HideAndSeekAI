export class StateIdle {
	constructor(machine, enemy) {
		this.interval = null;
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {

	}

	update() {
        // TODO: Run to player and catched him
	}

	finish() {
        // TODO: End game
	}
}
