import React, {useEffect, useRef, useState} from "react";
import './css/game.css';
import Board from './board/Board.jsx';
import {useInterval} from "../util/hooks/useInterval";
import Modal from "../modal/Modal";
import {ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ESCAPE, OPPOSITE_KEYS, SPACE} from "../util/const/keyboard";
import {useSettings} from "../settings/context/SettingsContext";

const keyPressMap = new Map()
    .set(ARROW_UP, (cell) => ({...cell, y: cell.y - 1}))
    .set(ARROW_DOWN, (cell) => ({...cell, y: cell.y + 1}))
    .set(ARROW_RIGHT, (cell) => ({...cell, x: cell.x + 1}))
    .set(ARROW_LEFT, (cell) => ({...cell, x: cell.x - 1}));

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const Game = () => {
    const {settings} = useSettings();
    const FIELD_SIZE = settings.fieldSize;

    const isOutOfBorders = (cell) => {
        return cell.x < 0 || cell.x > FIELD_SIZE - 1 || cell.y < 0 || cell.y > FIELD_SIZE - 1;
    }

    const getRandomCellCoords = () => ({
        x: getRandomInt(FIELD_SIZE - 1),
        y: getRandomInt(FIELD_SIZE - 1)
    });

    const isCellPersistInArray = (cell, cellArray) => {
        return cellArray.filter(value => value.x === cell.x && value.y === cell.y).length > 0;
    }

    const getRandomFoodCoords = (snakeCoords) => {
        let foodCoords = getRandomCellCoords();

        while (isCellPersistInArray(foodCoords, snakeCoords)) {
            foodCoords = getRandomCellCoords();
        }

        return foodCoords;
    }

    const snakeInitialCoords = getRandomCellCoords();

    const [score, setScore] = useState(0);
    const [snakeCoords, setSnakeCoords] = useState([snakeInitialCoords]);
    const [foodCords, setFoodCoords] = useState(getRandomFoodCoords([snakeInitialCoords]));
    const [isPaused, setIsPaused] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const direction = useRef(ARROW_RIGHT);

    const resetGame = () => {
        setScore(0);
        const newSnakeCoords = getRandomCellCoords();
        setSnakeCoords([newSnakeCoords]);
        setFoodCoords(getRandomFoodCoords([newSnakeCoords]));
        direction.current = ARROW_RIGHT;
        setIsPaused(false);
        setIsGameOver(false);
    }

    const handleKeyPress = (e) => {
        const button = e.code;
        if (button === SPACE && !isGameOver) {
            setIsPaused(true);
        }

        if (button === ESCAPE) {
            resetGame();
        }

        if (keyPressMap.has(button)) {
            const currentDirection = direction.current;

            if (OPPOSITE_KEYS.get(button) !== currentDirection) {
                direction.current = button;
            }
            setIsPaused(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, []);

    useEffect(() => {
        const newHead = snakeCoords[snakeCoords.length - 1];

        if (foodCords.x === newHead.x && foodCords.y === newHead.y) {
            setFoodCoords(getRandomFoodCoords(snakeCoords));
            setScore(score => score + (1 * settings.scorePointsCoefficient));
        }
    }, [snakeCoords])

    const moveSnake = () => {
        setSnakeCoords(snakeCoords => {
            const newCoords = [...snakeCoords];
            const head = newCoords[newCoords.length - 1];
            const newHeadPosition = keyPressMap.get(direction.current).call(this, {...head});

            if (isOutOfBorders(newHeadPosition) || isCellPersistInArray(newHeadPosition, newCoords)) {
                setIsGameOver(true);
                return newCoords;
            }

            if (newHeadPosition)

                if (newHeadPosition.x === foodCords.x && newHeadPosition.y === foodCords.y) {
                    newCoords.push(newHeadPosition);
                } else {
                    for (let i = 0; i < newCoords.length; i++) {
                        if (i < newCoords.length - 1) {
                            newCoords[i] = newCoords[i + 1];
                        } else {
                            newCoords[i] = newHeadPosition;
                        }
                    }
                }
            return newCoords;
        });
    }

    useInterval(() => {
        if (!isPaused && !isGameOver && new Date().getMilliseconds() % settings.speed <= 10) {
            moveSnake();
        }
    }, 10)

    return (
        <div className={'gameField'}>
            <h1>Difficulty: {settings.title}, Score: {score}</h1>
            <Modal isOpen={isPaused && !isGameOver} title={'Paused'}>
                <h4>Press any key to move forward: ↑↓←→</h4>
            </Modal>
            <Modal isOpen={isGameOver} title={`Game over! Score: ${score}`}>
                <h4>Press 'ESC' key to restart</h4>
            </Modal>
            <Board size={FIELD_SIZE} snakeCoords={snakeCoords} food={foodCords}></Board>
        </div>
    );
}

export default Game;



