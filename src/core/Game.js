
import { p5 } from "./P5Core"

export const setupP5 = (p5) => {

	p5.setup = () => {
		p5.createCanvas(1280, 720, p5.P2D)
	}
	p5.draw = () => {
		p5.background(100)
		drawCircle()
	}
}

const drawCircle = () => {
	p5.fill(255, 0, 0)
	p5.circle(p5.mouseX, p5.mouseY, 20.0)
}
