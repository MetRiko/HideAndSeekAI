import { p5 } from "../P5Core"

const speed = 5.0

export class Player {

	constructor(x, y) {
		this.position = p5.createVector(x, y)
		this.target = this.position
		this.moveVect = p5.createVector(0, 0)

		p5.mouseClicked = () => {
			this.target = p5.createVector(p5.mouseX, p5.mouseY)
			this.moveVect = this.target.copy().sub(this.position).normalize().mult(speed)
		}
	}

	update() {
		if (this.isTooFar()) {
			this.position = this.target
		}
		else {
			this.position.add(this.moveVect)
		}
	}

	isTooFar() {
		const newPosition = this.position.copy().add(this.moveVect)

		if (this.moveVect.x >= 0 && newPosition.copy().sub(this.target).x > 0 ) {return true}
		else if (this.moveVect.y >= 0 && newPosition.copy().sub(this.target).y > 0 ) {return true}
		else if (this.moveVect.x <= 0 && newPosition.copy().sub(this.target).x < 0 ) {return true}
		else if (this.moveVect.y <= 0 && newPosition.copy().sub(this.target).y < 0 ) {return true}
		else {return false}
	}

	render(p5) {
		p5.noStroke()
		p5.fill(255, 0, 0, 60)
		p5.circle(this.target.x, this.target.y, 5.0)

		p5.stroke(255, 0, 0, 60)
		p5.noFill()
		p5.circle(this.target.x, this.target.y, 35.0)

		p5.fill(70, 140, 250)
		p5.stroke(70, 80, 250)
		// p5.stroke()
		p5.circle(this.position.x, this.position.y, 40.0)
	}

}