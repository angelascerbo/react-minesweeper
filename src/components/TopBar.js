import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  timer: store.timer,
  numMinesRemain: store.numMinesRemain,
  boardStatus: store.boardStatus
});

const mapDispatchToProps = dispatch => ({
  loadGame: () => dispatch(actions.loadGame()),
  gameReset: () => dispatch(actions.gameReset())
});

class TopBar extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.loadGame();
  }

  render() {
    const resetFill = this.props.boardStatus !== 'LOST' ? '🌚' : '🌑';

    return(
      <div className="top-bar">
        <div className="util remain">
          {this.props.numMinesRemain}
        </div>
        <div className="util reset">
          <div onClick={() => {
            if (this.props.boardStatus !== 'PRISTINE') {
              this.props.gameReset();
            }
          }}>
            {resetFill}
          </div>
        </div>
        <div className="util timer">
          <Timer elapsed={this.props.timer} />
        </div>
      </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);