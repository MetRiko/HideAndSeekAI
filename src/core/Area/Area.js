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
        // const interval_new_enemy = setInterval(() => {this.new_enemy()}, 30000.0)
        const interval_new_enemy = setInterval(() => {this.new_enemy()}, 8000.0)

        this.endGame = false
        this.endTime = null
	}

    getPlayer() {
        return this.player
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

        const margin = 50.0

        const side = Math.floor(Math.random() * 4.0)
        let x = 0.0
        let y = 0.0

        if (side === 0) { // left
            y = Math.random() * (720.0 + margin * 2.0)
            x = 0 - margin
        }
        else if (side === 1) { // right
            y = Math.random() * (720.0 + margin * 2.0)
            x = 1280.0 + margin            
        }
        else if (side === 2) {  // top
            y = 0 - margin
            x = Math.random() * (1280.0 + margin * 2.0)
        }
        else if (side === 3) { // bottom
            y = 720.0 + margin
            x = Math.random() * (1280.0 + margin * 2.0)
        }

        const center = p5.createVector(1280.0 * 0.5, 720.0 * 0.5)
        const dirVec = p5.createVector(x, y).sub(center)
        const angle = p5.createVector(1.0, 0.0).angleBetween(dirVec)

        const newEnemy = new Enemy(x, y, this)
        newEnemy.setRotation(angle)
        this.enemies.push(newEnemy)
        // this.enemies.push(new Enemy(200, 100, this))
    }

	update() {
        this.player.update()
        this.player.hidden = this.isCollisionOfPlayerAndBush(this.player)
        this.enemies.forEach((entry) => {
            entry.update(this.player)
            if (entry.playerCaught) {
                this.end()
            }
        })
        this.coin.update(this.player)
	}

    end() {
        this.endGame = true
        this.endTime = this.minutesTimer.display
    }

    isCollisionOfPlayerAndBush(player) {
        let result = false
        for (const bush of this.bushes) {
            if (bush.collision(player.position, player.radius)) {
                result = true
                bush.player_inside = true
            }
            else {
                bush.player_inside = false
            }
        }
        return result
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