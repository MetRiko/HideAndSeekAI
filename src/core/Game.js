import { p5 } from "./P5Core"

import { Area } from "./Area/Area"

let area = null

export const setupP5 = (p5) => {

	p5.setup = () => {
		p5.createCanvas(1280, 720, p5.P2D)
		area = new Area(1280, 720)
	}
	p5.draw = () => {

		// udpate
		area.update()

		// render
		p5.background(20)
		area.render(p5)
	}

	// p5.mouseClicked = (event) => {
	// 	player.mouseClicked(event)
	// }
}

// const drawCircle = () => {
// 	p5.fill(255, 0, 0)
// 	p5.circle(p5.mouseX, p5.mouseY, 20.0)
// }
