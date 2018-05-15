import React from 'react';
import Square from './Square';

const Row = (props) => {
	const { cells, row } = props;

	const squareElements = cells.map((cell, i) => {
		const { flag, isMine, numAdjacentMines, state, x, y } = cell;
		return (
			<Square 
				key={i}
				flag={flag}
				isMine={isMine}
				numAdjacentMines={numAdjacentMines}
				status={state}
				x={x}
				y={y}
				handleClick={props.handleClick}
				handleRightClick={props.handleRightClick}
			/>
		)
	});

	return (
		<div className="row">
			{squareElements}
		</div>
	);
};

export default Row;