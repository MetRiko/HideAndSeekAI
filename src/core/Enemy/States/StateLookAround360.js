import * as Tween from "@tweenjs/tween.js"
import { p5 } from "../../P5Core"

export class StateLookAround360 {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;

		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)
	}
	
	onNoticePlayer() {
		this.machine.changeState("playerNoticed")
	}

	init() {
		this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)
		
		const startAngle = this.enemy.getRotation()
		const endAngle = startAngle + Math.PI * 2.0

		new Tween.Tween({value: startAngle})
			.to({value: endAngle}, 2500.0)
			.easing(Tween.Easing.Sinusoidal.InOut)
			.onUpdate(({value}) => this.enemy.setRotation(value))
			.onComplete(({value}) => {
				this.enemy.setRotation(value)
				this.machine.changeState("goToBush")
			})
			.start()
	}
	
	update() {
	}

	finish() {
		this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}
}
