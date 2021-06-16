import { p5 } from "../P5Core"
import StateMachine from "./StateMachine"
import SignalController from "./SignalController"

import Utils from "../../utils/Utils"

import { StateLookAround } from "./States/StateLookAround"
import { StateIdle } from "./States/StateIdle"
import { StateGoToRandomPosition } from "./States/StateGoToRandomPosition"
import { StateGoToLastSeenPlayer } from "./States/StateGoToLastSeenPlayer"
import { StateGoToBush } from "./States/StateGoToBush"
import { StateCheckBush } from "./States/StateCheckBush"
import { StatePlayerNoticed } from "./States/StatePlayerNoticed"
import { StateLookAround360 } from "./States/StateLookAround360"
import { StateCatched } from "./States/StateCatched"

const behaviours = {
	"idle": StateIdle,
	"goToRandomPosition": StateGoToRandomPosition,
	"lookAround": StateLookAround,
	"playerNoticed": StatePlayerNoticed,
	"goToLastSeenPlayer": StateGoToLastSeenPlayer,
	"lookAround360": StateLookAround360,
	"goToBush": StateGoToBush,
	"checkBush": StateCheckBush,
	"catched": StateCatched
}

const speed = 2.0

export default class Enemy {

	constructor(x, y, area) {
		this.pos = p5.createVector(x, y)
		this.rotation = 0.0

		this.area = area
		// this.catchRange = 0
		// this.playerCaught = false
		// this.lastSeenPlayerPosition = null

		this.moveSpeed = 3.0

		this.targetPos = null

		this.viewAngle = 0.3
		this.maxGrayViewRange = 320
		this.minOrangeViewRange = 150
		this.currentOrangeViewRange = this.minOrangeViewRange
		this.catchProgress = 0.0 // 0.0 - 1.0 (1.0 = game over)

		this.playerIsInsideGrayView = false
		this.playerIsInsideOrangeView = false

		this.playerLastPosition = null

		this.signalController = new SignalController()

		const machine = new StateMachine()
		machine.replaceStates(behaviours, this, this.area.getPlayer())
		machine.changeState("idle")
		this.stateMachine = machine

	}

	getPosition() {
		return this.pos
	}

	getSignalController() {
		return this.signalController
	}

	getRotation() {
		return this.rotation
	}

	move(vec) {
		this.pos.add(vec)
		this.rotation = p5.createVector(1.0, 0.0).angleBetween(vec)
	}

	setRotation(rotation) {
		this.rotation = rotation
	}

	update(player) {
		this.stateMachine.update()
		this.updateMovement()
		this.updateView(player)
		this.signalController.update()
	}

	stopMoving() {
		this.targetPos = null
	}

	isMoving() {
		return this.targetPos !== null 
	}

	moveToPosition(targetPos) {
		this.targetPos = targetPos
	}

	getForwardVector() {
		return p5.createVector(1.0, 0.0).rotate(this.rotation)
	}

	moveToPlayerLastPosition() {
		this.moveToPosition(this.playerLastPosition.copy())
		this.playerLastPosition = null
	}

	updateMovement() {
		if (this.targetPos) {
			const vec = this.targetPos.copy().sub(this.pos).normalize().mult(speed)
			this.move(vec)
			const nextVec = this.targetPos.copy().sub(this.pos)
			const difX = Math.sign(vec.x) !== Math.sign(nextVec.x)
			const difY = Math.sign(vec.y) !== Math.sign(nextVec.y)

			if (difX || difY) {
				this.pos = this.targetPos
				this.targetPos = null
				this.signalController.emitSignal("movement_to_target_finished")
			}
		}
	}

	getNearestBush() {
		let best_distance = Infinity
		let candidate_bush = null
		for (const bush of this.area.bushes) {
			let x1 = bush.position.x
			let y1 = bush.position.y
			let distance = (this.pos.x - x1) * (this.pos.x - x1) + (this.pos.y - y1) * (this.pos.y - y1)
			if(distance < best_distance) {
				best_distance = distance
				candidate_bush = bush
			}
        }
		return candidate_bush
	}

	_checkIfPlayerIsInsideGrayView(player) {
		const {pos, maxGrayViewRange, rotation, viewAngle} = this
		const isPlayerInsideGrayView = Utils.arcContainsPoint(
			pos.x, pos.y, maxGrayViewRange, rotation - viewAngle, rotation + viewAngle, 
			player.position.x, player.position.y
		)
		if (this.playerIsInsideGrayView === false && isPlayerInsideGrayView) {
			this.playerIsInsideGrayView = true
			this.signalController.emitSignal("player_enetered_gray_view")
		}
		else if (this.playerIsInsideGrayView === true && !isPlayerInsideGrayView) {
			this.playerIsInsideGrayView = false
			this.signalController.emitSignal("player_exited_gray_view")
		}
	}

	_checkIfPlayerIsInsideOrangeView(player) {
		const {pos, currentOrangeViewRange, rotation, viewAngle} = this
		const isPlayerInsideOrangeView = Utils.arcContainsPoint(
			pos.x, pos.y, currentOrangeViewRange, rotation - viewAngle, rotation + viewAngle, 
			player.position.x, player.position.y
		)
		if (this.playerIsInsideOrangeView === false && isPlayerInsideOrangeView) {
			this.playerIsInsideOrangeView = true
			this.signalController.emitSignal("player_enetered_orange_view")
		}
		else if (this.playerIsInsideOrangeView === true && !isPlayerInsideOrangeView) {
			this.playerIsInsideOrangeView = false
			this.signalController.emitSignal("player_exited_orange_view")
		}
	}

	updateView(player) {
		this._checkIfPlayerIsInsideGrayView(player)
		this._checkIfPlayerIsInsideOrangeView(player)
		
		const { maxGrayViewRange, minOrangeViewRange, currentOrangeViewRange, catchProgress } = this

		if (this.playerIsInsideGrayView === true) {
			this.currentOrangeViewRange = Utils.clamp(minOrangeViewRange, maxGrayViewRange, currentOrangeViewRange + 3.0)
		}
		else {
			this.currentOrangeViewRange = Utils.clamp(minOrangeViewRange, maxGrayViewRange, currentOrangeViewRange - 1.5)
		}
		
		if (this.playerIsInsideOrangeView === true) {
			const prev = this.catchProgress
			this.catchProgress = Utils.clamp(0.0, 1.0, catchProgress + 0.03)
			if (prev < 1.0 && this.catchProgress >= 1.0) {
				this.signalController.emitSignal("player_catched")
			}

			this.playerLastPosition = player.position
		}
		else {
			this.catchProgress = Utils.clamp(0.0, 1.0, catchProgress - 0.03)
		}

		// const {viewCurrentRange, catchRange} = this

		// const contains = Utils.arcContainsPoint(pos.x, pos.y, viewRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y) && !player.hidden
		// const seePlayer = Utils.arcContainsPoint(pos.x, pos.y, viewCurrentRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y) && !player.hidden
		// const caughtPlayer = Utils.arcContainsPoint(pos.x, pos.y, catchRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y) && !player.hidden
		// if (caughtPlayer) {
		// 	this.playerCaught = true
		// }
		// if (seePlayer) {
		// 	this.catchRange = Utils.clamp(0, this.viewCurrentRange, this.catchRange + 3.0)
		// 	this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange + 2.0)
		// 	this.lastSeenPlayerPosition = player.position.copy()
		// }
		// else if (contains) {
		// 	this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange + 2.0)
		// 	this.catchRange = Utils.clamp(0, this.viewCurrentRange, this.catchRange - 1.5)
		// 	if (this.lastSeenPlayerPosition != null) {
		// 		this.stateMachine.changeState("lookForPlayer")
		// 	}
		// }
		// else {
		// 	this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange - 1.0)
		// 	this.catchRange = Utils.clamp(0, this.viewCurrentRange, this.catchRange - 1.5)
		// 	if (this.lastSeenPlayerPosition != null) {
		// 		this.stateMachine.changeState("lookForPlayer")
		// 	}
		// }
	}

	renderView(p5) {

		const {pos, rotation, viewAngle, maxGrayViewRange, currentOrangeViewRange, catchProgress} = this

		p5.push()
		p5.translate(pos.x, pos.y)
		
		// Orange gray view
		p5.fill(255, 255, 255, 10)
		p5.noStroke()
		p5.arc(0, 0, maxGrayViewRange * 2.0, maxGrayViewRange * 2.0, rotation - viewAngle, rotation + viewAngle)
		
		// Orange range view
		p5.fill(255, 100 - 100 * catchProgress, 10, 30 + 50 * catchProgress)
		p5.noStroke()
		p5.arc(0, 0, currentOrangeViewRange * 2.0, currentOrangeViewRange * 2.0, rotation - viewAngle, rotation + viewAngle)

		p5.pop()
	}

	renderMovementIndicators(p5) {
		if (this.targetPos) {
			const vec = this.pos.copy().sub(this.targetPos).normalize().mult(15.0)
			const lineEndPos = this.targetPos.copy().add(vec)
	
			p5.stroke(80, 20, 20)
			p5.strokeWeight(2.0)
			p5.line(this.pos.x, this.pos.y, lineEndPos.x, lineEndPos.y)
			p5.noFill()
			p5.stroke(80, 20, 20)
			p5.strokeWeight(2.0)
			p5.circle(this.targetPos.x, this.targetPos.y, 30.0)
			p5.noStroke()
			p5.fill(80, 20, 20)
			p5.circle(this.targetPos.x, this.targetPos.y, 4.0)
		}
	}

	render(p5) {
		this.stateMachine.render(p5)
		this.renderMovementIndicators(p5)
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