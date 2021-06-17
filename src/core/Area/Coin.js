import { p5 } from "../P5Core"
import * as Tween from "@tweenjs/tween.js"

const size = 20.0

export class Coin {

	constructor(x_min, x_max, y_min, y_max) {
		this.position = p5.createVector(0, 0)
		this.x_min = x_min
		this.x_max = x_max
		this.y_min = y_min
		this.y_max = y_max
		this.score = 0
		this.new_position()
	}

    contains(x, y, distance) {
        return this.position.x - distance <= x && x <= this.position.x + distance &&
               this.position.y - distance <= y && y <= this.position.y + distance;
    }

	new_position() {
		this.position.x = Math.floor(Math.random() * (this.x_max-this.x_min)) + this.x_min
        this.position.y = Math.floor(Math.random() * (this.y_max-this.y_min)) + this.y_min
	}

	update(player) {
		if(this.contains(player.position.x, player.position.y, 30)) {
			this.score += 1
			this.new_position()

			const startRadius = 20.0
			const bigRadius = 25.0
			const smallRadius = 15.0

			const t1 = new Tween.Tween({r: startRadius})
				.to({r: bigRadius}, 100)
				.easing(Tween.Easing.Sinusoidal.Out)
				.onUpdate(({r}) => player.radius = r)
				.onComplete(({r}) => player.radius = r)
				
			const t2 = new Tween.Tween({r: bigRadius})
				.to({r: smallRadius}, 100)
				.easing(Tween.Easing.Sinusoidal.Out)
				.onUpdate(({r}) => player.radius = r)
				.onComplete(({r}) => player.radius = r)
				
			const t3 = new Tween.Tween({r: smallRadius})
				.to({r: startRadius}, 100)
				.easing(Tween.Easing.Sinusoidal.Out)
				.onUpdate(({r}) => player.radius = r)
				.onComplete(({r}) => player.radius = r)

			t1.chain(t2)
			t2.chain(t3)
			t1.start()
		}
	}

	render(p5) {
		p5.fill(220, 220, 0)
		p5.noStroke()
		p5.circle(this.position.x, this.position.y, size)
		p5.textSize(32);
		// p5.fill(255, 255, 255)
	
	
	
        p5.push()
        // p5.fill(255, 255, 255)
        p5.strokeWeight(2.0)
        p5.fill(220, 220, 0)
        p5.stroke(100, 20, 0)
		p5.text('Score: ' + this.score, 10, 80)
        p5.pop()
	
	
	}

}