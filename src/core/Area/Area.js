import { p5 } from "../P5Core"

import { Bush } from "./Bush"

const bushes_amount = 10

export class Area {

	constructor(width, height) {
		this.width = width
		this.height = height
        this.bushes = []
        for (let i = 0; i < bushes_amount; i++) {
            this.bushes.push(this.new_bush(width*0.1, width*0.9, height*0.1, height*0.9));
        }
	}

    new_bush(x_min, x_max, y_min, y_max) {
        let x, y
        while(true) {
            x = Math.floor(Math.random() * (x_max-x_min)) + x_min
            y = Math.floor(Math.random() * (y_max-y_min)) + y_min

            let is_near = false
            let res = this.bushes.forEach(function(bush) {
                if(bush.contains(x, y)) {
                    is_near = true
                }
            })
            if(is_near == false) {
                break
            }
        }
        return new Bush(x, y)
    }

	update() {

	}

	render(p5) {
        p5.background(100)
		p5.fill(255, 0, 0)
		this.bushes.forEach(function(entry) {
            entry.render(p5)
        })
	}
}