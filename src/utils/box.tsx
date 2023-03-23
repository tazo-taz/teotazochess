import { ICoords } from "../interfaces/game";
import { B, bishop, king, knight, pawn, queen, rook, timesValues, W } from "./constants";


export const seperateBoxValue = (boxValue: string) => {
    return [boxValue[0], boxValue.slice(1)]
};

export const seperateBoxTypeValue = (boxValue: string) => {
    return boxValue.split("-");
};

export const parseCoords = (row: number, column: number) => ({ row, column });

export const generateEmptyArr = () => Array.from({ length: 8 }, (a) =>
    Array.from({ length: 8 }, () => "")
);

export const reverseArr = (arr: string[][]) => {
    const emptyArr = generateEmptyArr()
    for (let row = 0; row <= 7; row++) {
        for (let column = 0; column <= 7; column++) {
            emptyArr[7 - row][7 - column] = arr[row][column]
        }
    }
    return emptyArr
}

export const generateArr = (sort: boolean = true): string[][] => {
    const whiteRow = sort ? 0 : 7
    const blackRow = sort ? 7 : 0

    const whiteRowPawn = sort ? 1 : 6
    const blackRowPawn = sort ? 6 : 1

    const arr = generateEmptyArr()

    for (let i = 0; i < 8; i++) {
        arr[whiteRowPawn][i] = B + pawn;
        arr[blackRowPawn][i] = W + pawn;
    }

    arr[whiteRow][0] = B + rook;
    arr[whiteRow][7] = B + rook;

    arr[blackRow][0] = W + rook;
    arr[blackRow][7] = W + rook;

    arr[whiteRow][1] = B + knight;
    arr[whiteRow][6] = B + knight;

    arr[blackRow][1] = W + knight;
    arr[blackRow][6] = W + knight;

    arr[whiteRow][2] = B + bishop;
    arr[whiteRow][5] = B + bishop;

    arr[blackRow][2] = W + bishop;
    arr[blackRow][5] = W + bishop;

    arr[whiteRow][3] = B + queen;
    arr[whiteRow][4] = B + king;

    arr[blackRow][3] = W + queen;
    arr[blackRow][4] = W + king;

    return arr;
};

export const generateCoordsArr: () => (ICoords[]) = () => {
    const arr: any = Array.from({ length: 8 }, (a) =>
        Array.from({ length: 8 }, () => "")
    );

    return arr.map((rowArr: any, row: any) => {
        rowArr = rowArr.map((_: any, column: any) => ({ row, column }))
        return rowArr
    })
}

export const getCoordsFromIndex = (inx: number) => {
    const row = Math.floor(inx / 8)
    const column = inx - row * 8
    return { row, column }
}

export const getOpponentColor = (color: string) => color === B ? W : B

export const getColorByTurn = (turn: boolean) => turn ? W : B

export const isKing = (piece: string) => piece.endsWith(king)

export const maxTimeValue = (maxTime: number) => timesValues.find(a => a.id === maxTime)?.value

export const getBoxColor = ({ row, column }: ICoords) => {
    let value = ""
    if (row % 2 === 0) {
        if (column % 2 === 0) value = "whitebox"
        else value = "darkbox"
    } else {
        if (column % 2 !== 0) value = "whitebox"
        else value = "darkbox"
    }
    return value
}

export const isBoardValid = (board: string[][]) => {
    const flattedBoard = board.flat()

    const wKingIndex = flattedBoard.indexOf(W + king) !== -1
    const BKingIndex = flattedBoard.indexOf(B + king) !== -1

    const wPawnIndex = flattedBoard.indexOf(W + pawn) !== -1
    const bPawnIndex = flattedBoard.indexOf(B + pawn) !== -1

    const wRookIndex = flattedBoard.indexOf(W + rook) !== -1
    const bRookIndex = flattedBoard.indexOf(B + rook) !== -1

    const wQueenIndex = flattedBoard.indexOf(W + queen) !== -1
    const bQueenIndex = flattedBoard.indexOf(B + queen) !== -1

    // bishops
    let wBishopIndex1: boolean | number = flattedBoard.indexOf(W + bishop)
    let wBishopIndex2: boolean | number = flattedBoard.lastIndexOf(W + bishop)
    wBishopIndex2 = wBishopIndex2 === wBishopIndex1 ? false : wBishopIndex2 !== -1 ? true : false
    wBishopIndex1 = wBishopIndex1 === -1 ? false : true

    let bBishopIndex1: boolean | number = flattedBoard.indexOf(B + bishop)
    let bBishopIndex2: boolean | number = flattedBoard.lastIndexOf(B + bishop)
    bBishopIndex2 = bBishopIndex2 === bBishopIndex1 ? false : bBishopIndex2 !== -1 ? true : false
    bBishopIndex1 = bBishopIndex1 === -1 ? false : true

    // knight
    let wKnightIndex1: boolean | number = flattedBoard.indexOf(W + knight)
    let wKnightIndex2: boolean | number = flattedBoard.lastIndexOf(W + knight)
    wKnightIndex2 = wKnightIndex2 === wKnightIndex1 ? false : wKnightIndex2 !== -1 ? true : false
    wKnightIndex1 = wKnightIndex1 === -1 ? false : true

    let bKnightIndex1: boolean | number = flattedBoard.indexOf(B + knight)
    let bKnightIndex2: boolean | number = flattedBoard.lastIndexOf(B + knight)
    bKnightIndex2 = bKnightIndex2 === bKnightIndex1 ? false : bKnightIndex2 !== -1 ? true : false
    bKnightIndex1 = bKnightIndex1 === -1 ? false : true


    // has kings in it
    if (!wKingIndex || !BKingIndex) return false

    if (wPawnIndex || bPawnIndex || wRookIndex || bRookIndex || wQueenIndex || bQueenIndex) return true

    let indexW = 0
    let indexB = 0

    if (wBishopIndex1) indexW++
    if (wBishopIndex2) indexW++
    if (wKnightIndex1) indexW++
    if (wKnightIndex2) indexW++

    if (bBishopIndex1) indexB++
    if (bBishopIndex2) indexB++
    if (bKnightIndex1) indexB++
    if (bKnightIndex2) indexB++


    if (indexW >= 2 || indexB >= 2) return true

    return false
}