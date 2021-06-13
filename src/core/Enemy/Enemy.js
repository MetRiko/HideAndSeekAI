import { p5 } from "../P5Core"



class StateMachine {

	constructor() {
		this.states = {}
		this.currentStateId = null
		this.nextStateId = null
	}
	
	addState(stateId, stateClass, ...args) {
		this.states[stateId] = new stateClass(this, ...args)
	}

	replaceStates(states, ...args) {
		Object.entries(states).forEach(([stateId, stateClass]) => this.addState(stateId, stateClass, ...args))
	}

	changeState(stateId) {
		this.nextStateId = stateId
	}

	update() {
		const state = this.states[this.currentStateId]
		if (this.nextStateId !== this.currentStateId) {
			state?.finish()
			this.currentStateId = this.nextStateId
			const newState = this.states[this.currentStateId]
			newState?.init()
			// this.nextStateId = null
		}
		else if (state) {
			state?.update(this.changeState)
		}
	}

}


class StateIdle {
	constructor(machine, enemy) {
		this.interval = null
		this.machine = machine
		this.enemy = enemy
	}
	init() {
		this.interval = setInterval(() => {
			console.log("nice!")
			this.enemy.move(p5.createVector(10.0, 0.0))
		}, 1000.0)
		setTimeout(() => {
			this.machine.changeState(null)
		}, 5000.0)
	}
	update() {
		this.enemy.move(p5.createVector(0.4, 0.0))
	}
	finish() {
		clearInterval(this.interval)
	}
}

const behaviours = {
	"idle": StateIdle
}

export default class Enemy {

	constructor(x, y) {
		this.pos = p5.createVector(x, y)
		const machine = new StateMachine()
		this.stateMachine = machine
		machine.replaceStates(behaviours, this)
		machine.changeState("idle")
	}

	move(vec) {
		this.pos.add(vec)
	}

	update() {
		this.stateMachine.update()
	}

	render(p5) {
		const {x, y} = this.pos
		// p5.noStroke()
		p5.stroke(255 * 0.4, 100 * 0.2, 0)
		p5.strokeWeight(4.0)
		// p5.fill(255, 100, 0)
		p5.fill(255 * 0.8, 100 * 0.2, 0)
		// p5.rotate(Math.PI * 0.5)
		p5.circle(x, y, 34.0)

		p5.noStroke()
		p5.fill(20, 0, 0)
		// p5.fill(255 * 0.8, 0, 0)
		p5.circle(x + 7.0, y + 5.5, 8.0)
		p5.circle(x + 7.0, y - 5.5, 8.0)
	}
}