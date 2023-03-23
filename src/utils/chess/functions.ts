import { ICoords } from "../../interfaces/game";
import { B, W } from "../constants";
import { horizontalBoard, verticalBoard } from "./constants";

export const getColorByTurn = (turn: boolean) => turn ? W : B

export const seperateBoxValue = (boxValue: string) => {
    return [boxValue[0], boxValue.slice(1)];
};

export const getOpponentColor = (color: string) => color === B ? W : B

export const parseCoords = (row: number, column: number) => ({ row, column });

export const isCoordsIncludesCoords = (arr: ICoords[], coords: ICoords) => {
    return arr.find(move => {
        const { row: rowToCheck, column: columnToCheck } = move
        const { row, column } = coords
        return row === rowToCheck && column === columnToCheck
    })
}

export const hasCoords = (arr: ICoords[], coords: ICoords) => {
    return arr.find(a => compareCoords(a, coords)) ? true : false
}

export const compareCoords = ({ row: row1, column: column1 }: ICoords, { row: row2, column: column2 }: ICoords) => row1 === row2 && column1 === column2

export const generateCoordsArr: () => (ICoords[]) = () => {
    const arr: any = Array.from({ length: 8 }, (a) =>
        Array.from({ length: 8 }, () => "")
    );

    return arr.map((rowArr: any, row: any) => {
        rowArr = rowArr.map((_: any, column: any) => ({ row, column }))
        return rowArr
    })
}

export const getCoordsByIndex = (inx: number) => {
    const row = Math.floor(inx / 8)
    const column = inx - row * 8
    return { row, column }
}

export const coordsToBoardCoords = ({ row, column }: ICoords) => {
    return horizontalBoard[column] + verticalBoard[row]
}

const chessFunctions = {
    getColorByTurn,
    seperateBoxValue,
    getOpponentColor,
    parseCoords,
    isCoordsIncludesCoords,
    hasCoords,
    compareCoords,
    getCoordsByIndex,
    generateCoordsArr,
    coordsToBoardCoords
}

export default chessFunctions