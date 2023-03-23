import React, { useEffect, useRef, useState } from 'react'
import { activeBoxType, ICoords } from '../../interfaces/game'
import { useLocalStorage } from '../../tJS/customHooks'
import useChess from '../../utils/chess'
import { compareCoords } from '../../utils/chess/functions'
import { IPuzzleLvls } from '../../utils/constants'
import useRedux from '../../utils/redux'
import PuzzleComponent from './Puzzle.component'

export default function PuzzleContainer({ currentPuzzleLvl }: { currentPuzzleLvl: IPuzzleLvls }) {

    const { arr, moves, id, turn } = currentPuzzleLvl

    const movesCount = useRef(0)
    const [activeBox, setActiveBox] = useState<activeBoxType>(null)
    const [isGameOver, setIsGameOver] = useState(false)
    const [gameOverMessage, setGameOverMessage] = useState(false)
    const { puzzleLvl, setPuzzleLvl } = useRedux()
    const timeoutSeconds = useRef(700)



    const chess = useChess({
        defaultArr: arr,
        defaultTurn: turn,
        shouldMove: (fromCoords: ICoords, toCoords: ICoords) => {
            if (!moves) return false
            const currentMove = moves[movesCount.current]

            if (currentMove) {
                const { from, to } = currentMove

                if (compareCoords(from, fromCoords) && compareCoords(to, toCoords)) {
                    movesCount.current = movesCount.current + 1
                    return true
                } else {
                    movesCount.current = movesCount.current + 1
                    setGameOverMessage(false)
                    setIsGameOver(true);
                    return true

                }
            }
        }
    })

    const tryAgain = () => {
        chess.clear()
        movesCount.current = 0
        setIsGameOver(false)
        setGameOverMessage(false)
        timeoutSeconds.current = 700
    }


    useEffect(() => {
        let timeout: any
        if (moves && movesCount.current % 2 === 0) {
            const currentMove = moves[movesCount.current]
            if (currentMove) {
                const { from, to } = currentMove
                timeout = setTimeout(() => chess.move(from, to), timeoutSeconds.current)
                timeoutSeconds.current = 200
            }
        }
        return () => clearTimeout(timeout)
    }, [chess])

    useEffect(() => {
        chess.clear()
        setGameOverMessage(false)
        setIsGameOver(false)
    }, [id])

    useEffect(() => {
        setIsGameOver(chess.isGameOver || isGameOver);
        setGameOverMessage(chess.isGameOver ? true : false)
        if (chess.isGameOver && puzzleLvl === id && !isGameOver) {
            setPuzzleLvl(id + 1)
        }
    }, [chess.isGameOver, id, puzzleLvl, setPuzzleLvl, isGameOver])


    const PuzzleComponentProps = {
        id,
        chess,
        activeBox,
        setActiveBox,
        isGameOver,
        gameOverMessage,
        tryAgain,
        turn
    }

    return (
        <PuzzleComponent {...PuzzleComponentProps} />
    )
}
