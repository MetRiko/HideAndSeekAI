import { p5 } from "../P5Core"
import StateMachine from "./StateMachine"
import Utils from "../../utils/Utils"
import { StateLookAround } from "./States/StateLookAround"
import { StateIdle } from "./States/StateIdle"
import { StateMoveToRandomPosition } from "./States/StateMoveToRandomPosition"
import { StateLookForPlayer } from "./States/StateLookForPlayer"

const behaviours = {
	"idle": StateIdle,
	"moveToRandomPosition": StateMoveToRandomPosition,
	"lookAround": StateLookAround,
	"lookForPlayer": StateLookForPlayer
}

export default class Enemy {

	constructor(x, y) {
		this.pos = p5.createVector(x, y)
		const machine = new StateMachine()
		this.rotation = 0.0
		this.viewRange = 320
		this.viewReactionRange = 150
		this.viewCurrentRange = this.viewReactionRange
		this.catchRange = 0
		this.viewAngle = 0.3
		this.playerCaught = false
		this.lastSeenPlayerPosition = null

		this.stateMachine = machine
		machine.replaceStates(behaviours, this)
		machine.changeState("idle")
	}

	move(vec) {
		this.pos.add(vec)
		this.rotation = p5.createVector(1.0, 0.0).angleBetween(vec)
	}

	update(player) {
		this.stateMachine.update()
		this.updateView(player)
	}

	updateView(player) {
		const {pos, viewRange, viewCurrentRange, catchRange, rotation, viewAngle} = this
		const contains = Utils.arcContainsPoint(pos.x, pos.y, viewRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y) && !player.hidden
		const seePlayer = Utils.arcContainsPoint(pos.x, pos.y, viewCurrentRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y) && !player.hidden
		const caughtPlayer = Utils.arcContainsPoint(pos.x, pos.y, catchRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y) && !player.hidden
		if (caughtPlayer) {
			this.playerCaught = true
		}
		if (seePlayer) {
			this.catchRange = Utils.clamp(0, this.viewCurrentRange, this.catchRange + 3.0)
			this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange + 2.0)
			this.lastSeenPlayerPosition = player.position.copy()
		}
		else if (contains) {
			this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange + 2.0)
			this.catchRange = Utils.clamp(0, this.viewCurrentRange, this.catchRange - 1.5)
			if (this.lastSeenPlayerPosition != null) {
				console.log("aaaaa")
				// console.log(this.lastSeenPlayerPosition)
				this.stateMachine.changeState("lookForPlayer")
				// this.clearLastSeenPlayerPosition()
			}
		}
		else {
			this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange - 1.0)
			this.catchRange = Utils.clamp(0, this.viewCurrentRange, this.catchRange - 1.5)
			if (this.lastSeenPlayerPosition != null) {
				console.log("bbbbbb")
				console.log(this.lastSeenPlayerPosition)

				this.stateMachine.changeState("lookForPlayer")
				// this.clearLastSeenPlayerPosition()

			}
		}
	}

	clearLastSeenPlayerPosition() {
		console.log("cleeeeaaaar")
		this.lastSeenPlayerPosition = null
	}

	renderView(p5) {

		const {pos, rotation, viewRange, viewAngle, viewCurrentRange, catchRange} = this

		// p5.push()
		// p5.translate(x, y)
		p5.push()
		p5.translate(pos.x, pos.y)
		p5.fill(255, 255, 255, 10)
		p5.noStroke()
		p5.arc(0, 0, viewRange * 2.0, viewRange * 2.0, rotation - viewAngle, rotation + viewAngle)
		p5.fill(255, 100, 10, 30)
		p5.noStroke()
		p5.arc(0, 0, viewCurrentRange * 2.0, viewCurrentRange * 2.0, rotation - viewAngle, rotation + viewAngle)
		
		p5.fill(255, 0, 0, 20)
		p5.noStroke()
		p5.arc(0, 0, catchRange * 2.0, catchRange * 2.0, rotation - viewAngle, rotation + viewAngle)

		p5.pop()
		// p5.pop()
		// p5.rotate(this.rotation)

	}

	render(p5) {
		this.stateMachine.render(p5)
		this.renderView(p5)

		const {x, y} = this.pos
		// p5.noStroke()
		p5.push()
		p5.translate(x, y)
		p5.rotate(this.rotation)
		p5.stroke(255 * 0.4, 100 * 0.2, 0)
		p5.strokeWeight(4.0)
		// p5.fill(255, 100, 0)
		p5.fill(255 * 0.8, 100 * 0.2, 0)
		// p5.rotate(Math.PI * 0.5)
		p5.circle(0, 0, 34.0)
		
		p5.noStroke()
		p5.fill(20, 0, 0)
		// p5.fill(255 * 0.8, 0, 0)
		p5.circle(7.0, 5.5, 8.0)
		p5.circle(7.0, -5.5, 8.0)
		p5.rotate(0.0)
		p5.pop()
	}
}