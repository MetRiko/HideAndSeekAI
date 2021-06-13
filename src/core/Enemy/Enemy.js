import { p5 } from "../P5Core"
import StateMachine from "./StateMachine"
import Utils from "../../utils/Utils"

class StateIdle {
	constructor(machine, enemy) {
		this.interval = null
		this.machine = machine
		this.enemy = enemy
	}
	init() {
		setTimeout(() => {
			this.machine.changeState("moveToRandomPosition")
		}, 2000.0)
	}
	finish() {
		clearInterval(this.interval)
	}
}

class StateMoveToRandomPosition {

	moveSpeed = 2.0 

	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
		this.targetPos = null
	}
	init() {
		this.targetPos = p5.createVector(p5.random(p5.width), p5.random(p5.height))
	}
	update() {
		const vec = this.targetPos.copy().sub(this.enemy.pos).normalize().mult(this.moveSpeed)
		this.enemy.move(vec)
		const nextVec = this.targetPos.copy().sub(this.enemy.pos)
		const difX = Math.sign(vec.x) !== Math.sign(nextVec.x)
		const difY = Math.sign(vec.y) !== Math.sign(nextVec.y)
		// console.log(vec, nextVec)
		if (difX || difY) {
			this.machine.changeState("lookAround")
			this.enemy.pos = this.targetPos
		}
	}
	render(p5) {
		const vec = this.enemy.pos.copy().sub(this.targetPos).normalize().mult(15.0)
		const lineEndPos = this.targetPos.copy().add(vec)

		p5.stroke(80, 20, 20)
		p5.strokeWeight(2.0)
		p5.line(this.enemy.pos.x, this.enemy.pos.y, lineEndPos.x, lineEndPos.y)
		p5.noFill()
		p5.stroke(80, 20, 20)
		p5.strokeWeight(2.0)
		p5.circle(this.targetPos.x, this.targetPos.y, 30.0)
		p5.noStroke()
		p5.fill(80, 20, 20)
		p5.circle(this.targetPos.x, this.targetPos.y, 4.0)
	}
}

class StateLookAround {
	constructor(machine, enemy) {
		this.machine = machine
		this.enemy = enemy
	}
	init() {
		// this.interval = setInterval(() => {
		// 	console.log("nice!")
		// 	this.enemy.move(p5.createVector(10.0, 0.0))
		// }, 1000.0)
		// setTimeout(() => {
		// 	this.machine.changeState(null)
		// }, 5000.0)
		console.log("LOOK AROUND")
		this.machine.changeState("idle")
	}
	update() {
		// this.enemy.move(p5.createVector(0.4, 0.0))
	}
	finish() {
		// clearInterval(this.interval)
	}
}

const behaviours = {
	"idle": StateIdle,
	"moveToRandomPosition": StateMoveToRandomPosition,
	"lookAround": StateLookAround
}

export default class Enemy {

	constructor(x, y) {
		this.pos = p5.createVector(x, y)
		const machine = new StateMachine()
		this.stateMachine = machine
		machine.replaceStates(behaviours, this)
		machine.changeState("idle")
		this.rotation = 0.0
		this.viewRange = 320
		this.viewReactionRange = 150
		this.viewCurrentRange = this.viewReactionRange
		this.viewAngle = 0.3
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
		const {pos, viewRange, rotation, viewAngle} = this
		const contains = Utils.arcContainsPoint(pos.x, pos.y, viewRange, rotation - viewAngle, rotation + viewAngle, player.position.x, player.position.y)
		if (contains) {
			this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange + 2.0)
		}
		else {
			this.viewCurrentRange = Utils.clamp(this.viewReactionRange, this.viewRange, this.viewCurrentRange - 1.0)
		}
	}

	renderView(p5) {

		const {pos, rotation, viewRange, viewAngle, viewCurrentRange} = this

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