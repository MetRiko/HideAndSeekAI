export default class SignalController {

	constructor() {
		this.connections = {}
		this.queuedSignals = []
	}

	emitSignal(signalName) {
		this.queuedSignals.push({ signalName })
	}

	connect(signalName, callback) {
		const signal = this.connections[signalName]
		if (!signal) {
			this.connections[signalName] = [callback]
		}
		else {
			this.connections[signalName].push(callback)
		}
	}

	disconnect(signalName, callback) {
		this.connections[signalName] = this.connections[signalName].filter(c => c !== callback)
	}

	update() {
		this.queuedSignals.forEach(({ signalName }) => {
			const connections = this.connections[signalName]
			if (connections) {
				this.connections[signalName].forEach(callback => callback())
			}
		})
		this.queuedSignals = []
	}
}