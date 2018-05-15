import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import Row from './Row';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  rows: store.rows,
  boardStatus: store.boardStatus
});

const mapDispatchToProps = dispatch => ({
  startGame: (id, x, y) => dispatch(actions.startGame(id, x, y)),
  timerTick: () => dispatch(actions.timerTick()),
  cellClick: (x, y) => dispatch(actions.handleCellClick(x, y)),
  cellRightClick: (x, y) => dispatch(actions.handleCellRightClick(x,y))
});

class Board extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { rows } = this.props;
    let message = null;

    if (this.props.boardStatus === 'WON') {
      message = "🎆"
    }

    if (this.props.boardStatus === 'LOST') {
      message = "😑"
    }

    const rowsElements = rows.map((cells, i) => (
      <Row 
        key={i} 
        row={i} 
        cells={cells}
        handleClick={(e) => {
          const x = 1 * e.currentTarget.dataset.x; 
          const y = 1 * e.currentTarget.dataset.y;

          if (this.props.boardStatus === 'PRISTINE') {
            const timerID = setInterval(() => {
              this.props.timerTick();
            }, 1000)

            this.props.startGame(timerID, x, y);
          } else {
            this.props.cellClick(x, y);
          }
        }}
        handleRightClick={(e) => {
          e.preventDefault();
          if (this.props.boardStatus !== 'PRISTINE') {
            const x = 1 * e.currentTarget.dataset.x; 
            const y = 1 * e.currentTarget.dataset.y;
            this.props.cellRightClick(x,y);
          }
        }}
      />
    ));
    return(
      <div className="board">
        <span className="message">{message}</span>
        {rowsElements}
      </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);