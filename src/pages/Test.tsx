import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ICoords } from '../interfaces/game'
import { generateArr } from '../utils/box'
import { B, pawn, W } from '../utils/constants'

const useChess = () => {
    const [board, setBoard] = useState(generateArr())
    const currentMoves = useRef([])
    const [turn, setTurn] = useState(true)

    const seperateValue = (value: string) => [value[0], value.slice(1)]

    const move = (from: ICoords, to: ICoords) => {
        console.log(from, to);
    }

    const getCoordMoves = useCallback(({ row, column }: ICoords) => {
        const [color, piece] = seperateValue(board[row][column])
        console.log(color, piece, turn);
        const moves = []

        if (color === W) {
            if (piece === pawn) {
                // zevit
                if (row >= 1 && !board[row - 1][column]) moves.push({ row: row - 1, column })
                if (row >= 2 && !board[row - 2][column] && !board[row - 1][column] && row === 6) moves.push({ row: row - 2, column })

                // zevit marcxniv mokla
                // if (row >= 1 && !board[row - 1][column] &&) moves.push({ row: row - 1, column })
            }
        }

        return moves
    }, [turn, board])

    const getMoves = useCallback(() => {
        const start = turn ? W : B

        let pieces = board.map((a, row) =>
            a.map((b, column) =>
                b.startsWith(start) ? ({ row, column }) : ""
            )
        ).flat().filter(a => a !== "")

        pieces.forEach(piece => {
            piece && console.log(getCoordMoves(piece))
        })

    }, [board, turn, getCoordMoves])

    useEffect(() => {
        getMoves()
    }, [turn, getMoves])

    return {
        move
    }
}

export default function Test() {
    const chess = useChess()
    useEffect(() => {
        // chess.move({ row: 6, column: 3 }, { row: 4, column: 3 })
    }, [])
    return (
        <div>Test</div>
    )
}
