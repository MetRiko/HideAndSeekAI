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


// export class ExampleState {
// 	constructor(machine, ...args) {
// 		//...
// 	}
// 	init() { /*...*/ }
// 	update() { /*...*/ }
// 	finish() { /*...*/ }
// }



// // W kodzie poza stanami
// this.sc.emitSignal("signal_name")

// // W kodzie stanów
// const action = () => {}
// this.sc.connect("signal_name", action)
// this.sc.disconnect("signal_name", action)