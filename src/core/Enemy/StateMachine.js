
export default class StateMachine {

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
		console.log(`change state ${stateId}`)
		this.nextStateId = stateId
	}

	update() {
		const state = this.states[this.currentStateId]
		if (this.nextStateId !== this.currentStateId) {
			state?.finish?.()
			this.currentStateId = this.nextStateId
			const newState = this.states[this.currentStateId]
			newState?.init?.()
			// this.nextStateId = null
		}
		else if (state) {
			state?.update?.()
		}
	}
	
	render(p5) {
		const state = this.states[this.currentStateId]
		if (state) {
			state?.render?.(p5)
		}
	}

}