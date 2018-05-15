import React, { Component } from 'react'; 
import TopBar from './TopBar';
import Board from './Board';

class App extends Component {
	constructor(){
		super();
	}

	render() {
		return(
			<main>
				<h1>NiteSweeper</h1>
				<div className="gameContainer">	
					<TopBar/>
					<Board/>
				</div> 
			</main>
		);
	}
}

export default App;