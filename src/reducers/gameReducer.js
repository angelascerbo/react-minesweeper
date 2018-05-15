import * as types from '../constants/actionTypes';
import minesweeper from 'minesweeper';

// BoardStateEnum has keys: PRISTINE, IN_PROGRESS, LOST, WON
const BoardStateEnum = minesweeper.BoardStateEnum;

// Override minesweeper library default options, when passed to generateMineArray
const boardOptions = {
  rows: 8,
  cols: 8,
  mines: 10
};

const tempRows = [
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', ''],
  ['', '', '', '','', '', '', '']
];

const initialState = {
  mineArray: minesweeper.generateMineArray(boardOptions),
  board: null,
  rows: tempRows,
  timer: 0,
  timerID: null,
  boardStatus: null,
  numMinesRemain: 0,
  flaggedMines: 0
};

const gameReducer = (state = initialState, action) => {
  const stateCopy = Object.assign({}, state);
  const boardCopy = Object.create(stateCopy.board);
  const mineArrayCopy = [...stateCopy.mineArray]

  switch (action.type) {
    case types.LOAD_GAME:
      console.log('Starting mine array', stateCopy.mineArray);
      stateCopy.board = new minesweeper.Board(stateCopy.mineArray);
      stateCopy.boardStatus = Object.keys(BoardStateEnum)[stateCopy.board.state()];
      stateCopy.rows = stateCopy.board.grid();
      stateCopy.numMinesRemain = stateCopy.board._numMines;

      return stateCopy;
    
    case types.START_GAME:
      stateCopy.timerID = action.id;

      // if the target cell is a mine, move the mine to a new cell
      if (stateCopy.rows[action.y][action.x].isMine) {
        // change the target value in mine array to 0 i.e. remove mine
        mineArrayCopy[action.y][action.x] = 0;

        // determine first available cell (i.e. value = 0 / doesn't contain mine) to place mine, update mine array
        for (let i = 0; i < mineArrayCopy.length; i++) {
          let stopLoop = false;

          for (let j = 0; j < mineArrayCopy[i].length; j++) {
            if (mineArrayCopy[i][j] !== 1) {
              mineArrayCopy[i][j] = 1;
              stopLoop = true;
              break;
            }
          }

          if (stopLoop) break;
        }

        console.log('New mine array', mineArrayCopy);

        stateCopy.board = new minesweeper.Board(mineArrayCopy)
      } 

      const updatedBoard = Object.create(stateCopy.board);
      updatedBoard.openCell(action.x, action.y);
      stateCopy.board = updatedBoard;
      stateCopy.boardStatus = Object.keys(BoardStateEnum)[updatedBoard.state()];
      stateCopy.rows = [...updatedBoard.grid()];

      return stateCopy;

    case types.SET_TIMER_ID:
      stateCopy.timer += 1;
      return stateCopy;

    case types.CELL_CLICK:
      boardCopy.openCell(action.x, action.y);
      stateCopy.board = boardCopy;
      stateCopy.rows = [...boardCopy.grid()];
      stateCopy.boardStatus = Object.keys(BoardStateEnum)[stateCopy.board.state()];
      
      if (stateCopy.boardStatus === 'LOST' || stateCopy.boardStatus === 'WON') {
        clearInterval(stateCopy.timerID);
        stateCopy.timerID = null;
      } 

      return stateCopy;

    case types.CELL_RIGHT_CLICK:
      boardCopy.cycleCellFlag(action.x, action.y);
      stateCopy.rows = [...boardCopy.grid()];
      stateCopy.board = boardCopy;
      stateCopy.boardStatus = Object.keys(BoardStateEnum)[stateCopy.board.state()];
      
      // flag values: 0 = empty, 1 = flagged, 2 = in question
      if (stateCopy.rows[action.y][action.x].flag === 1) {
        stateCopy.numMinesRemain -= 1;
      } else {
        if (stateCopy.numMinesRemain < stateCopy.board._numMines && stateCopy.rows[action.y][action.x].flag === 2) stateCopy.numMinesRemain += 1;
      }

      return stateCopy;

    case types.GAME_RESET:
      clearInterval(stateCopy.timerID);
      stateCopy.timerID = null;
      stateCopy.timer = 0;
      stateCopy.mineArray = minesweeper.generateMineArray(boardOptions);
      stateCopy.board = new minesweeper.Board(stateCopy.mineArray);
      stateCopy.boardStatus = Object.keys(BoardStateEnum)[stateCopy.board.state()];
      stateCopy.rows = [...stateCopy.board.grid()];
      stateCopy.numMinesRemain = stateCopy.board._numMines;

      console.log('Starting mine array', stateCopy.mineArray);

      return stateCopy;

    default: 
      return state;
  }
}

export default gameReducer;