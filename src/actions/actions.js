import * as types from '../constants/actionTypes'

const loadGame = () => ({
	type: types.LOAD_GAME
});

const startGame = (id, x, y) => ({
	type: types.START_GAME,
	id,
	x,
	y
});

const handleCellRightClick = (x, y) => ({
	type: types.CELL_RIGHT_CLICK,
	x,
	y
});

const handleCellClick = (x, y) => ({
	type: types.CELL_CLICK,
	x,
	y
});

const gameReset = () => ({
	type: types.GAME_RESET
});

const timerTick = () => ({
	type: types.SET_TIMER_ID
});


module.exports = {
	loadGame,
	startGame,
	handleCellRightClick,
	handleCellClick,
	gameReset,
	timerTick
}