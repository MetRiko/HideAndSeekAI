import { p5 } from "../P5Core"

const size = 60.0
const distance = 150.0

export class Bush {

	constructor(x, y) {
		this.x = x
		this.y = y
	}

    contains(x, y) {
        return this.x - distance <= x && x <= this.x + distance &&
               this.y - distance <= y && y <= this.y + distance;
    }

	update() {
	}

	render(p5) {
		p5.fill(0, 192, 0)
		p5.noStroke()
		p5.circle(this.x, this.y, size)
	}

}