import { p5 } from "./P5Core"

export class EndGame {
    constructor(time, score) {
        this.time = time
        this.score = score
    }

    render() {
        p5.textAlign(p5.CENTER);
		p5.textSize(32);
		p5.fill(255, 255, 255)
        p5.text("You got caught!", 640, 300)
        p5.text('Time: ' + this.time, 640, 360)
        p5.text('Score: ' + this.score, 640, 400)
    }
}