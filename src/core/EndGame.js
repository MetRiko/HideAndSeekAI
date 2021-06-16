import { p5 } from "./P5Core"

export class EndGame {
    constructor(time, score, onSpacePressed) {
        this.time = time
        this.score = score
        this.onSpacePressed = onSpacePressed
    }

    render() {
        p5.textAlign(p5.CENTER);
		p5.textSize(32);
		p5.fill(255, 255, 255)
        p5.text("You got caught!", 640, 300)
        p5.text('Time: ' + this.time, 640, 360)
        p5.text('Score: ' + this.score, 640, 400)

        p5.text('Press SPACE to start a new game!', 640, 460)
        p5.keyPressed = () => {
            if (p5.keyCode == 32) {
                this.onSpacePressed()
            }
        }
    }
}