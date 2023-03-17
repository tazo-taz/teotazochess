import { ICoords } from "../interfaces/game";
import { B, bishop, king, knight, pawn, queen, rook, W } from "./constants";
import { bbishop, bking, bknight, bpawn, bquenn, brook, wbishop, wking, wknight, wpawn, wquenn, wrook } from "./images";

const useBox = () => {

}

export default useBox

export const seperateBoxValue = (boxValue: string) => {
    return [boxValue[0], boxValue.slice(1)];
};

export const parseCoords = (row: number, column: number) => ({ row, column });

export const getPieceElement = (a: string) => {
    const [color, piece] = seperateBoxValue(a);
    switch (piece) {
        case pawn:
            return (
                <img
                    alt=""
                    className={"piece " + (color === W ? "white" : "black")}
                    src={color === W ? wpawn : bpawn}
                />
            );

        case knight:
            return (
                <img
                    alt=""
                    className={"piece " + (color === W ? "white" : "black")}
                    src={color === W ? wknight : bknight}
                />
            );

        case bishop:
            return (
                <img
                    alt=""
                    className={"piece " + (color === W ? "white" : "black")}
                    src={color === W ? wbishop : bbishop}
                />
            );

        case rook:
            return (
                <img
                    alt=""
                    className={"piece " + (color === W ? "white" : "black")}
                    src={color === W ? wrook : brook}
                />
            );

        case queen:
            return (
                <img
                    alt=""
                    className={"piece " + (color === W ? "white" : "black")}
                    src={color === W ? wquenn : bquenn}
                />
            );

        case king:
            return (
                <img
                    alt=""
                    className={"piece " + (color === W ? "white" : "black")}
                    src={color === W ? wking : bking}
                />
            );

        default:
            break;
    }
};

export const generateArr = () => {
    const arr = Array.from({ length: 8 }, (a) =>
        Array.from({ length: 8 }, () => "")
    );
    for (let i = 0; i < 8; i++) {
        arr[1][i] = B + pawn;
        arr[6][i] = W + pawn;
    }

    arr[0][0] = B + rook;
    arr[0][7] = B + rook;

    arr[7][0] = W + rook;
    arr[7][7] = W + rook;

    arr[0][1] = B + knight;
    arr[0][6] = B + knight;

    arr[7][1] = W + knight;
    arr[7][6] = W + knight;

    arr[0][2] = B + bishop;
    arr[0][5] = B + bishop;

    arr[7][2] = W + bishop;
    arr[7][5] = W + bishop;

    arr[0][3] = B + queen;
    arr[0][4] = B + king;

    arr[7][3] = W + queen;
    arr[7][4] = W + king;

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