import Utils from "../../utils/Utils"
import { p5 } from "../P5Core"

const speed = 5.0

const keyW = 87
const keyS = 83
const keyA = 65
const keyD = 68

const keyUp = 38
const keyDown = 40
const keyLeft = 37
const keyRight = 39

export class Player {

	constructor(x, y) {
		this.hidden = false
		this.radius = 20.0
		this.position = p5.createVector(x, y)
		this.target = this.position
		this.moveVect = p5.createVector(0, 0)
		this.rotation = 0.0

		// p5.mouseClicked = () => {
		// 	this.target = p5.createVector(p5.mouseX, p5.mouseY)
		// 	this.moveVect = this.target.copy().sub(this.position).normalize().mult(speed)
		// 	this.rotation = p5.createVector(1.0, 0.0).angleBetween(this.moveVect)
		// }
	}

	update() {
		// if (this.isTooFar()) {
		// 	this.position = this.target
		// }
		// else {
		// 	this.position.add(this.moveVect)
		// }
		this.updateMovement()
	}

	move(vec) {
		this.position.add(vec)

		const radius = this.radius
		this.position.x = Utils.clamp(0.0 + radius, 1280.0 - radius, this.position.x)
		this.position.y = Utils.clamp(0.0 + radius, 720.0 - radius, this.position.y)

		this.rotation = p5.createVector(1.0, 0.0).angleBetween(vec)
	}

	getForwardVector() {
		return p5.createVector(1.0, 0.0).rotate(this.rotation)
	}

	updateMovement() {
		let vec = p5.createVector(0.0, 0.0)
		if (p5.keyIsDown(keyW) || p5.keyIsDown(keyUp)) {
			vec.y = -1.0
		}
		else if (p5.keyIsDown(keyS) || p5.keyIsDown(keyDown)) {
			vec.y = 1.0
		}
		if (p5.keyIsDown(keyA) || p5.keyIsDown(keyLeft)) {
			vec.x = -1.0
		}
		else if (p5.keyIsDown(keyD) || p5.keyIsDown(keyRight)) {
			vec.x = 1.0
		}
		if (vec.x !== 0 || vec.y !== 0) {

			const forward = this.getForwardVector()
			const deltaAngle = forward.angleBetween(vec)
			forward.rotate(deltaAngle * 0.15)
			this.move(forward.mult(3.0))
			// vec.normalize().mult(2.0)
			// this.move(vec)
		}
	}

	getPosition() {
		return this.position
	}

	isTooFar() {
		const newPosition = this.position.copy().add(this.moveVect)

		return (this.moveVect.x >= 0 && newPosition.copy().sub(this.target).x > 0 ) ||
		(this.moveVect.y >= 0 && newPosition.copy().sub(this.target).y > 0 ) ||
		(this.moveVect.x <= 0 && newPosition.copy().sub(this.target).x < 0 ) || 
		(this.moveVect.y <= 0 && newPosition.copy().sub(this.target).y < 0 )
	}

	render(p5) {
		// target
		if (this.position != this.target) {
			p5.noStroke()
			p5.fill(70, 80, 250, 50)
			p5.circle(this.target.x, this.target.y, 5.0)
	
			p5.stroke(70, 80, 250, 50)
			p5.noFill()
			p5.circle(this.target.x, this.target.y, 35.0)
		}

		if (!this.hidden) {
			// player body
			p5.fill(70, 140, 250)
			p5.stroke(0, 100, 255)
			p5.circle(this.position.x, this.position.y, this.radius * 2)

			// player eyes
			p5.push()
			p5.translate(this.position)
			p5.rotate(this.rotation)

			p5.noStroke()
			p5.fill(0, 40, 100)
			p5.circle(7.0, 5.5, 8.0)
			p5.circle(7.0, -5.5, 8.0)
		} else {
			// player body
			p5.fill(70, 140, 250, 95)
			p5.stroke(0, 100, 255, 95)
			p5.circle(this.position.x, this.position.y, this.radius * 2)
			
			// player eyes
			p5.push()
			p5.translate(this.position)
			p5.rotate(this.rotation)

			p5.noStroke()
			p5.fill(0, 40, 100, 95)
			p5.circle(7.0, 5.5, 8.0)
			p5.circle(7.0, -5.5, 8.0)
		}

		p5.rotate(0.0)
        p5.pop()
	}

}