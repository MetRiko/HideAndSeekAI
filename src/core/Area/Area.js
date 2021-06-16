import { p5 } from "../P5Core"

import { Bush } from "./Bush"
import { Coin } from "./Coin"
import { Player } from "../Player/Player"
import Enemy from "../Enemy/Enemy"

import MinutesTimer from 'minutes-timer'

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

        this.minutesTimer = new MinutesTimer()
        this.minutesTimer.start();
        const interval_new_enemy = setInterval(() => {this.new_enemy()}, 30000.0)

        this.endGame = false
        this.endTime = null
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
        this.enemies.push(new Enemy(200, 100, this))
    }

	update() {
        this.player.update()
        this.player.hidden = this.isCollisionOfPlayerAndBush(this.player)
        this.enemies.forEach((entry) => {
            entry.update(this.player)
            if (entry.playerCaught) {
                this.endGame = true
                this.endTime = this.minutesTimer.display
            }
        })
        this.coin.update(this.player)
	}

    isCollisionOfPlayerAndBush(player) {
        for (const bush of this.bushes) {
            if (bush.collision(player.position, player.radius)) return true
        }
        return false
    }

	render(p5) {
		this.bushes.forEach(function(entry) {
            entry.render(p5)
        })
        this.coin.render(p5)
        p5.text('Time: ' + this.minutesTimer.display, 10, 40)
        this.player.render(p5)
        this.enemies.forEach(function(entry) {
            entry.render(p5)
        })
	}
}