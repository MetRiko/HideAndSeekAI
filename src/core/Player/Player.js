import { p5 } from "../P5Core"

const speed = 5.0

export class Player {

	constructor(x, y) {
		this.x = x
		this.y = y
	}

	update() {
		if (p5.keyIsDown(p5.LEFT_ARROW)) {
			this.x -= speed
		}
		else if (p5.keyIsDown(p5.RIGHT_ARROW)) {
			this.x += speed
		}
	}

	render(p5) {
		p5.fill(255, 0, 0)
		p5.noStroke()
		// p5.stroke(255, 255, 225)
		// p5.stroke()
		p5.circle(this.x, this.y, 30.0)
	}

}