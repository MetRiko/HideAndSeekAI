import { p5 } from "../P5Core"

import { Bush } from "./Bush"
import { Coin } from "./Coin"

const bushes_amount = 10
const bushes_distance = 150.0
const area_border = 20.0

export class Area {

	constructor(width, height) {
		this.width = width
		this.height = height
        this.x_min = area_border
        this.x_max = width-(2*area_border)
        this.y_min = area_border
        this.y_max = height-(2*area_border)
        this.bushes = []
        for (let i = 0; i < bushes_amount; i++) {
            this.bushes.push(this.new_bush());
        }
        this.coin = new Coin(this.x_min, this.x_max, this.y_min, this.y_max)
	}

    new_bush() {
        let x, y
        while(true) {
            x = Math.floor(Math.random() * (this.x_max-this.x_min)) + this.x_min
            y = Math.floor(Math.random() * (this.y_max-this.y_min)) + this.y_min

            let is_near = false
            this.bushes.forEach(function(bush) {
                if(bush.contains(x, y, bushes_distance)) {
                    is_near = true
                }
            })
            if(is_near == false) {
                break
            }
        }
        return new Bush(x, y)
    }

    new_coin() {
        this.coin = new Coin()
    }

	update() {

	}

	render(p5) {
        p5.background(200)
        p5.fill(100, 100, 100)
        p5.rect(area_border, area_border, this.width-(2*area_border), this.height-(2*area_border), 20);
		this.bushes.forEach(function(entry) {
            entry.render(p5)
        })
        this.coin.render(p5)
	}
}