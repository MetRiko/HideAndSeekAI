import { p5 } from "../P5Core"

import { Bush } from "./Bush"
import { Coin } from "./Coin"
import { Player } from "../Player/Player"
import Enemy from "../Enemy/Enemy"

const bushes_amount = 8
const bushes_distance = 150.0
const area_border = 20.0

export class Area {

	constructor(width, height) {
		this.width = width
		this.height = height

        this.player = new Player(600, 300)
        this.enemies = []
        this.new_enemy()

        this.x_min = area_border
        this.x_max = width-(2*area_border)
        this.y_min = area_border
        this.y_max = height-(2*area_border)
        
        this.bushes = []
        for (let i = 0; i < bushes_amount; i++) {
            this.bushes.push(this.new_bush());
        }
        this.coin = new Coin(this.x_min, this.x_max, this.y_min, this.y_max)
        
        this.time = 0
        const interval = setInterval(() => {this.time += 1}, 1000.0) //wykonuj metodę {...} co 1000 ms
        //clearInterval(interval)
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

    new_enemy() {
        this.enemies.push(new Enemy(200, 100))
    }

	update() {
        this.player.update()
        this.enemies.forEach(function(entry) {
            entry.update()
        })
        this.coin.update(this.player)
	}

	render(p5) {
        // p5.background(200)
        // p5.fill(100, 100, 100)
        // p5.rect(area_border, area_border, this.width-(2*area_border), this.height-(2*area_border), 20);
		this.bushes.forEach(function(entry) {
            entry.render(p5)
        })
        this.coin.render(p5)
        p5.text('Time: ' + this.time, 10, 80);
        this.player.render(p5)
        this.enemies.forEach(function(entry) {
            entry.render(p5)
        })
	}
}