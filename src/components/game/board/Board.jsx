import React from "react";
import '../css/game.css';

const Board = (props) => {
    const {size, snakeCoords, food} = props;

    const BOARD_SIZE_IN_PX = 700;
    const CELL_SIZE_IN_PX = BOARD_SIZE_IN_PX / size + 'px';
    const SNAKE_HEAD = snakeCoords[snakeCoords.length - 1];

    const isFood = (x, y) => {
        return food.x === x && food.y === y;
    }

    const isSnakeHead = (x, y) => {
        return SNAKE_HEAD.x === x && SNAKE_HEAD.y === y;
    }

    const isSnake = (y, x) => {
        return snakeCoords.some(value => value.y === y && value.x === x);
    }

    const createBoard = BOARD_SIZE => {
        const board = [];
        for (let y = 0; y < BOARD_SIZE; y++) {
            const currentRow = [];
            for (let x = 0; x < BOARD_SIZE; x++) {
                if (isFood(x, y)) {
                    currentRow.push('food');
                } else if (isSnakeHead(x, y)) {
                    currentRow.push('head')
                } else if (isSnake(y, x)) {
                    currentRow.push('snake');
                } else {
                    currentRow.push('empty');
                }
            }
            board.push(currentRow);
        }

        return board;
    };

    const board = createBoard(size, snakeCoords, food);

    return <div className="board">
        {board.map((row, rowIdx) => (
            <div key={rowIdx} style={{height: CELL_SIZE_IN_PX}}>
                {row.map((cellValue, cellIdx) => {
                    return <div key={cellIdx} className={`cell ${cellValue}`}
                                style={{width: CELL_SIZE_IN_PX, height: CELL_SIZE_IN_PX}}></div>;
                })}
            </div>
        ))}
    </div>;
}

export default Board;