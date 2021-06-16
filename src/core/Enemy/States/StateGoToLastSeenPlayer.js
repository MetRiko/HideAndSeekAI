export class StateGoToLastSeenPlayer {
	constructor(machine, enemy, player) {
		this.machine = machine
		this.enemy = enemy
		this.player = player

		this.onMovementToTargetFinishedCallback = this.onMovementToTargetFinished.bind(this)
		this.onNoticePlayerCallback = this.onNoticePlayer.bind(this)
	}

	onMovementToTargetFinished() {
		this.machine.changeState("lookAround360")
	}

	onNoticePlayer() {
		this.machine.changeState("playerNoticed")
	}

	init() {
		this.enemy.moveToPosition(this.player.getPosition())
		this.enemy.getSignalController().connect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().connect("player_enetered_orange_view", this.onNoticePlayerCallback)
	}

	update() {
	}

	finish() {
		this.enemy.getSignalController().disconnect("movement_to_target_finished", this.onMovementToTargetFinishedCallback)
		this.enemy.getSignalController().disconnect("player_enetered_orange_view", this.onNoticePlayerCallback)
	}
}
