import { p5 } from "../P5Core"

export class Bush {

	constructor(x, y) {
        this.position = p5.createVector(x, y)
        this.rotate = Math.random()
        this.size = p5.random(20, 40)
	}

    contains(x, y, distance) {
        return this.position.x - distance <= x && x <= this.position.x + distance &&
               this.position.y - distance <= y && y <= this.position.y + distance;
    }

	collision(otherPosition) {
		return this.position.copy().sub(otherPosition).mag() < this.size * 1.3
	}

	update() {
	}

	render(p5) {
        p5.noStroke()
        p5.push()
        p5.translate(this.position)
        p5.rotate(this.rotate)
        let angle = 0
        let curr_size = this.size
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 5; j++) {
                let x = (curr_size) * Math.sin(angle)
                let y = (curr_size) * Math.cos(angle)
                p5.fill(0, 100+(i*12), 0)
                p5.circle(x, y, curr_size)
                angle += 2.399963;
            }
            curr_size *= 0.92
        }
        p5.circle(0, 0, curr_size*1.5)
        p5.pop()
	}

}