export class StateCatched {
	constructor(machine, enemy) {
		this.interval = null;
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
        this.enemy.area.end()
	}

	update() {
        // TODO: Run to player and catched him
	}

	finish() {
        // TODO: End game
	}
}
