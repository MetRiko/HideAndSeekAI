import { p5 } from "../../P5Core"

export class StateGoToLastSeenPlayer {
	constructor(machine, enemy, player) {
		this.machine = machine
		this.enemy = enemy
		this.player = player

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)

		this.isMovingForward = false

		this.onCatchUserCallback = this.onCatchUser.bind(this)
	}

	onMovementToTargetFinished() {
		this.machine.changeState("lookAround360")
	}

	onNoticePlayer() {
		this.machine.changeState("playerNoticed")
	}

	onCatchUser() {
		this.machine.changeState("catched")
	}

	init() {
		this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().connect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().connect("player_catched", this.onCatchUserCallback)
		
		this.enemy.stopMoving()
		this.isMovingForward = false
		this.targetPos = this.player.getPosition().copy()	
		// this.enemy.moveToPosition(this.player.getPosition())
	}

	update() {
		if (this.isMovingForward === false) {

			const dirVec = this.targetPos.copy().sub(this.enemy.getPosition())
			const enemyVec = this.enemy.getForwardVector()
			const deltaAngle = enemyVec.angleBetween(dirVec)
			
			// this.enemy.setRotation(this.enemy.getRotation() + deltaAngle * 0.98)

			const moveDir = p5.createVector(1.0, 0.0).rotate(this.enemy.getRotation() + Math.sign(deltaAngle) * 0.01)

			this.enemy.move(moveDir.mult(1.2))

			if (Math.abs(deltaAngle) < 0.02) {
				this.isMovingForward = true
				this.enemy.moveToPosition(this.targetPos)
			}
		}
	}

	finish() {
		this.enemy.getSignalController().disconnect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().disconnect("player_entered_orange_view", this.onNoticePlayerCallback)
		this.enemy.getSignalController().disconnect("player_catched", this.onCatchUserCallback)
	}
}
