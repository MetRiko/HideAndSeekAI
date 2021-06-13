import { p5 } from "../P5Core"

const size = 60.0

export class Bush {

	constructor(x, y) {
		this.x = x
		this.y = y
	}

    contains(x, y, distance) {
        return this.x - distance <= x && x <= this.x + distance &&
               this.y - distance <= y && y <= this.y + distance;
    }

	collision(otherPosition) {
		return p5.createVector(this.x, this.y).copy().sub(otherPosition).mag() < size * 0.5
	}

	update() {
	}

	render(p5) {
		p5.fill(0, 192, 0)
		p5.noStroke()
		p5.circle(this.x, this.y, size)
	}

}