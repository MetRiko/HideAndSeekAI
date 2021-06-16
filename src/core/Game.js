import { p5 } from "./P5Core"

import { Area } from "./Area/Area"
import { EndGame } from "./EndGame"
import * as Tween from "@tweenjs/tween.js"

let area = null
let endGameScreen = null

export const setupP5 = (p5) => {

	p5.setup = () => {
		p5.createCanvas(1280, 720, p5.P2D)
		area = new Area(1280, 720)
	}

	p5.draw = () => {

		// udpate
		Tween.update(performance.now())
		if (!area.endGame) {
			area.update()
		}

		// render
		p5.background(20)
		if (area.endGame) {
			endGameScreen = new EndGame(area.endTime, area.coin.score)
			endGameScreen.render()
		} else {
			area.render(p5)
		}
	}

	// p5.mouseClicked = (event) => {
	// 	player.mouseClicked(event)
	// }
}

const startNewGame = () => {
	area = new Area(1280, 720)
}

// const drawCircle = () => {
// 	p5.fill(255, 0, 0)
// 	p5.circle(p5.mouseX, p5.mouseY, 20.0)
// }
