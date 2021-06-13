
import { p5 } from "./P5Core"

import { Player } from "./Player/Player"

let player = null

export const setupP5 = (p5) => {

	p5.setup = () => {
		p5.createCanvas(1280, 720, p5.P2D)
		player = new Player(600, 300)
	}
	p5.draw = () => {

		// udpate
		player.update()

		// render
		p5.background(100)
		player.render(p5)
		// drawCircle()
	}

	// p5.mouseClicked = (event) => {
	// 	player.mouseClicked(event)
	// }
}

// const drawCircle = () => {
// 	p5.fill(255, 0, 0)
// 	p5.circle(p5.mouseX, p5.mouseY, 20.0)
// }
