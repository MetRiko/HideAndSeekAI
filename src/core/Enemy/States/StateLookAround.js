import * as Tween from "@tweenjs/tween.js";

export class StateLookAround {
	constructor(machine, enemy) {
		this.machine = machine;
		this.enemy = enemy;
	}
	init() {
		this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)

		console.log("LOOK AROUND");
		// this.machine.changeState("idle");
		
		const rot = {value: this.enemy.getRotation()}
		const rotationTween1 = new Tween.Tween(rot)
			.to({value: rot.value + Math.PI * 0.25}, 500.0)
			.easing(Tween.Easing.Sinusoidal.InOut)
			.onUpdate(({value}) => this.enemy.setRotation(value))
			.onComplete(({value}) => this.enemy.setRotation(value))

		const rotationTween2 = new Tween.Tween(rot)
			.to({value: rot.value - Math.PI * 0.25}, 500.0)
			.easing(Tween.Easing.Sinusoidal.InOut)
			.onUpdate(({value}) => this.enemy.setRotation(value))
			.onComplete(({value}) => this.enemy.setRotation(value))

		const rotationTween3 = new Tween.Tween(rot)
			.to({value: rot.value}, 500.0)
			.easing(Tween.Easing.Sinusoidal.InOut)
			.onUpdate(({value}) => this.enemy.setRotation(value))
			.onComplete(({value}) => {
				this.enemy.setRotation(value)
				this.machine.changeState("idle")
			})
		
		rotationTween1.chain(rotationTween2)
		rotationTween2.chain(rotationTween3)
		rotationTween1.start()

	}
	update() {
		// TODO: If orange area -> noticed
	}
	finish() {
		this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}
}
