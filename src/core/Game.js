
import Enemy from "./Enemy/Enemy"
import { p5 } from "./P5Core"

import { Area } from "./Area/Area"
import { Player } from "./Player/Player"

let player = null
let enemy = null
let area = null

export const setupP5 = (p5) => {

	p5.setup = () => {
		p5.createCanvas(1280, 720, p5.P2D)
		enemy = new Enemy(200, 100)
		area = new Area(1280, 720)
		player = new Player(600, 300)
	}
	p5.draw = () => {

		// udpate
		area.update()
		player.update()
		enemy.update()

		// render
		p5.background(20)
		area.render(p5)
		player.render(p5)
		enemy.render(p5)
	}

	// p5.mouseClicked = (event) => {
	// 	player.mouseClicked(event)
	// }
}

// const drawCircle = () => {
// 	p5.fill(255, 0, 0)
// 	p5.circle(p5.mouseX, p5.mouseY, 20.0)
// }
