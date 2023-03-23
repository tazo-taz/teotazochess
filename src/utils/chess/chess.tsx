import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ICanMoveCoords, ICoords } from "../../interfaces/game"
import { useDidMountEffect } from "../../tJS/customHooks"
import { generateArr, getOpponentColor, isBoardValid, reverseArr } from "../box"
import { B, bishop, king, knight, pawn, queen, rook, W } from "../constants"
import { BIG_CASTLE, SIMPLE_MOVE, SMALL_CASTLE } from "./constants"
import chessFunctions from "./functions"

const { compareCoords, generateCoordsArr, getColorByTurn, getCoordsByIndex, hasCoords, parseCoords, seperateBoxValue, coordsToBoardCoords } = chessFunctions

export type allMovesType = {
    coords: ICoords;
    moves: ICoords[];
}

interface ITwoCoords {
    from: ICoords,
    to: ICoords,
}

export interface IHistory {
    from: ICoords & { box: string },
    to: ICoords & { box: string },
    piece: string,
    boxCoord: string
}

interface IEscapedPawns extends ITwoCoords {
    color: string
}

interface IProps {
    onClear?: Function,
    onMove?: Function,
    shouldMove?: Function,
    defaultArr?: string[][],
    defaultTurn?: boolean,
    defaultSort?: boolean,
}

export interface IUseChess {
    arr: string[][],
    turn: boolean,
    myMoves: allMovesType[],
    getPieceMoves: (coords: ICoords) => allMovesType,
    move: (from: ICoords, to: ICoords) => "Wrong move" | undefined,
    isWhiteChecked: boolean,
    isBlackChecked: boolean,
    isGameOver: boolean,
    isLoading: boolean,
    clear: () => void,
    history: IHistory[],
    isPawnUpdating: (from: ICoords, to: ICoords, toSearchArr: string[][]) => boolean,
    upgradedPawn: (from: ICoords, to: ICoords, piece: string) => void,
    isWhiteWinner: boolean,
    isBlackWinner: boolean,
    isStalemate: boolean,
    setLoose: (i: boolean) => void,
}

export const useChessDefaultReturn = {
    arr: [],
    turn: false,
    myMoves: [],
    getPieceMoves: () => ({
        coords: { row: 2, column: 3 },
        moves: []
    }),
    move: () => undefined,
    isWhiteChecked: false,
    isBlackChecked: false,
    isWhiteWinner: false,
    isBlackWinner: false,
    isGameOver: false,
    isLoading: false,
    isStalemate: false,
    clear: () => { },
    history: [],
    isPawnUpdating: () => false,
    upgradedPawn: () => { },
    setLoose: () => { },
}

const useChess = ({ onClear, onMove, shouldMove, defaultTurn = true, defaultSort = true, defaultArr }: IProps = {}): IUseChess => {
    const [arr, setArr] = useState<string[][]>(defaultArr || generateArr(defaultSort))
    const escapedPawns = useRef<IEscapedPawns[]>([])
    const shouldPawnUpgrade = useRef(false)
    const [turn, setTurn] = useState<boolean>(defaultTurn)
    const [isWKingMoved, setIsWKingMoved] = useState<boolean>(false)
    const [isWRook1gMoved, setIsWRook1gMoved] = useState<boolean>(false)
    const [isWRook2gMoved, setIsWRook2gMoved] = useState<boolean>(false)
    const [isBKingMoved, setIsBKingMoved] = useState<boolean>(false)
    const [isBRook1gMoved, setIsBRook1gMoved] = useState<boolean>(false)
    const [isBRook2gMoved, setIsBRook2gMoved] = useState<boolean>(false)
    const [myMoves, setMyMoves] = useState<allMovesType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [history, setHistory] = useState<IHistory[]>([])
    const [forcedWinner, setForcedWinner] = useState<null | string>(null)

    const getKingPosition = (color: string, toSearchArr = arr) => {
        return getCoordsByIndex(generateCoordsArr().flat().findIndex(({ row, column }) => toSearchArr[row][column] === color + king))
    }

    const allPieces = (turnn = turn, toSearchArr = arr) => {
        const arrFlated = toSearchArr.flat()
        const color = getColorByTurn(turnn)
        return generateCoordsArr().flat()?.filter((coords, inx) => {
            return arrFlated[inx].startsWith(color)
        })
    }

    const getMovableCoords = (coords: ICoords, toSearchArr = arr) => {
        const { row, column } = coords;
        let boxValue = toSearchArr[row][column];

        if (!boxValue) return [];
        let increment;


        const [color, piece] = seperateBoxValue(boxValue);
        const opponentColor = getOpponentColor(color)

        const canMoveCoords: ICanMoveCoords[] = [];

        const bishopMove = () => {
            increment = 1;

            // qveda marjvena
            while (
                toSearchArr[row + increment] &&
                toSearchArr[row + increment][column + increment] === ""
            ) {
                canMoveCoords.push(parseCoords(row + increment, column + increment));
                increment++;
            }
            if (
                toSearchArr[row + increment] &&
                toSearchArr[row + increment][column + increment] &&
                toSearchArr[row + increment][column + increment].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row + increment, column + increment));

            // qveda marcxena
            increment = 1;

            while (
                toSearchArr[row + increment] &&
                toSearchArr[row + increment][column - increment] === ""
            ) {
                canMoveCoords.push(parseCoords(row + increment, column - increment));
                increment++;
            }
            if (
                toSearchArr[row + increment] &&
                toSearchArr[row + increment][column - increment] &&
                toSearchArr[row + increment][column - increment].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row + increment, column - increment));

            // zeda marjvena
            increment = 1;

            while (
                toSearchArr[row - increment] &&
                toSearchArr[row - increment][column + increment] === ""
            ) {
                canMoveCoords.push(parseCoords(row - increment, column + increment));
                increment++;
            }
            if (
                toSearchArr[row - increment] &&
                toSearchArr[row - increment][column + increment] &&
                toSearchArr[row - increment][column + increment].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row - increment, column + increment));

            // zeda marcxena
            increment = 1;

            while (
                toSearchArr[row - increment] &&
                toSearchArr[row - increment][column - increment] === ""
            ) {
                canMoveCoords.push(parseCoords(row - increment, column - increment));
                increment++;
            }

            if (
                toSearchArr[row - increment] &&
                toSearchArr[row - increment][column - increment] &&
                toSearchArr[row - increment][column - increment].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row - increment, column - increment));
        };

        const rookMove = () => {
            // qveda
            increment = 1;
            while (toSearchArr[row + increment] && toSearchArr[row + increment][column] === "") {
                canMoveCoords.push(parseCoords(row + increment, column));
                increment++;
            }
            if (
                toSearchArr[row + increment] &&
                toSearchArr[row + increment][column] &&
                toSearchArr[row + increment][column].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row + increment, column));

            // zeda
            increment = 1;
            while (toSearchArr[row - increment] && toSearchArr[row - increment][column] === "") {
                canMoveCoords.push(parseCoords(row - increment, column));
                increment++;
            }
            if (
                toSearchArr[row - increment] &&
                toSearchArr[row - increment][column] &&
                toSearchArr[row - increment][column].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row - increment, column));

            // marjvena
            increment = 1;
            while (toSearchArr[row] && toSearchArr[row][column + increment] === "") {
                canMoveCoords.push(parseCoords(row, column + increment));
                increment++;
            }
            if (
                toSearchArr[row] &&
                toSearchArr[row][column + increment] &&
                toSearchArr[row][column + increment].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row, column + increment));

            // marcxena
            increment = 1;
            while (toSearchArr[row] && toSearchArr[row][column - increment] === "") {
                canMoveCoords.push(parseCoords(row, column - increment));
                increment++;
            }
            if (
                toSearchArr[row] &&
                toSearchArr[row][column - increment] &&
                toSearchArr[row][column - increment].startsWith(opponentColor)
            )
                canMoveCoords.push(parseCoords(row, column - increment));
        };


        switch (piece) {
            case pawn:
                if ((color === W && defaultSort === true) || (color === B && !defaultSort)) {
                    if (row >= 1 && !toSearchArr[row - 1][column])
                        canMoveCoords.push(parseCoords(row - 1, column));
                    if (row >= 2 && !toSearchArr[row - 2][column] && !toSearchArr[row - 1][column] && row === 6)
                        canMoveCoords.push(parseCoords(row - 2, column));
                    if (column > 0 && row >= 1 && toSearchArr[row - 1][column - 1].startsWith(defaultSort ? B : W))
                        canMoveCoords.push(parseCoords(row - 1, column - 1));
                    if (column < 7 && row >= 1 && toSearchArr[row - 1][column + 1].startsWith(defaultSort ? B : W))
                        canMoveCoords.push(parseCoords(row - 1, column + 1));
                } else {
                    if (row <= 6 && !toSearchArr[row + 1][column])
                        canMoveCoords.push(parseCoords(row + 1, column));
                    if (row <= 5 && !toSearchArr[row + 2][column] && !toSearchArr[row + 1][column] && row === 1)
                        canMoveCoords.push(parseCoords(row + 2, column));
                    if (column > 0 && row <= 6 && toSearchArr[row + 1][column - 1].startsWith(defaultSort ? W : B))
                        canMoveCoords.push(parseCoords(row + 1, column - 1));
                    if (column < 7 && row <= 6 && toSearchArr[row + 1][column + 1].startsWith(defaultSort ? W : B))
                        canMoveCoords.push(parseCoords(row + 1, column + 1));
                }
                break;

            case knight:
                if (
                    row >= 2 &&
                    column <= 6 &&
                    !toSearchArr[row - 2][column + 1].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row - 2, column + 1));
                if (
                    row >= 2 &&
                    column >= 1 &&
                    !toSearchArr[row - 2][column - 1].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row - 2, column - 1));
                if (
                    row >= 1 &&
                    column <= 5 &&
                    !toSearchArr[row - 1][column + 2].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row - 1, column + 2));
                if (
                    row >= 1 &&
                    column >= 2 &&
                    !toSearchArr[row - 1][column - 2].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row - 1, column - 2));

                // ukan
                if (
                    row <= 5 &&
                    column <= 6 &&
                    !toSearchArr[row + 2][column + 1].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row + 2, column + 1));
                if (
                    row <= 5 &&
                    column >= 1 &&
                    !toSearchArr[row + 2][column - 1].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row + 2, column - 1));
                if (
                    row <= 6 &&
                    column <= 5 &&
                    !toSearchArr[row + 1][column + 2].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row + 1, column + 2));
                if (
                    row <= 6 &&
                    column >= 2 &&
                    !toSearchArr[row + 1][column - 2].startsWith(color)
                )
                    canMoveCoords.push(parseCoords(row + 1, column - 2));

                break;

            case bishop:
                bishopMove();
                break;

            case rook:
                rookMove();

                break;

            case queen:
                bishopMove();
                rookMove();

                break;

            case king:
                // bottom
                if (
                    row <= 6 &&
                    (toSearchArr[row + 1][column] === "" ||
                        toSearchArr[row + 1][column].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row + 1, column));

                // top
                if (
                    row >= 1 &&
                    (toSearchArr[row - 1][column] === "" ||
                        toSearchArr[row - 1][column].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row - 1, column));

                // right
                if (
                    column <= 6 &&
                    (toSearchArr[row][column + 1] === "" ||
                        toSearchArr[row][column + 1].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row, column + 1));

                // left
                if (
                    column >= 1 &&
                    (toSearchArr[row][column - 1] === "" ||
                        toSearchArr[row][column - 1].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row, column - 1));

                // diagonal bottom right
                if (
                    row <= 6 &&
                    column <= 6 &&
                    (toSearchArr[row + 1][column + 1] === "" ||
                        toSearchArr[row + 1][column + 1].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row + 1, column + 1));

                // diagonal bottom left
                if (
                    row <= 6 &&
                    column >= 1 &&
                    (toSearchArr[row + 1][column - 1] === "" ||
                        toSearchArr[row + 1][column - 1].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row + 1, column - 1));

                // // diagonal top right
                if (
                    row >= 1 &&
                    column <= 6 &&
                    (toSearchArr[row - 1][column + 1] === "" ||
                        toSearchArr[row - 1][column + 1].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row - 1, column + 1));

                // // diagonal top left
                if (
                    row >= 1 &&
                    column >= 1 &&
                    (toSearchArr[row - 1][column - 1] === "" ||
                        toSearchArr[row - 1][column - 1].startsWith(opponentColor))
                )
                    canMoveCoords.push(parseCoords(row - 1, column - 1));

                const kingCastleMoves = (
                    isKingMoved: boolean,
                    isRook1gMoved: boolean,
                    isRook2gMoved: boolean,
                    row: number,
                    color: string,
                ) => {
                    console.log(isKingMoved, isRook1gMoved, isRook2gMoved, row, color);

                    if (!isKingMoved) {
                        if (
                            !isRook1gMoved &&
                            toSearchArr[row][1] === "" &&
                            toSearchArr[row][2] === "" &&
                            toSearchArr[row][3] === "" &&
                            toSearchArr[row][0].startsWith(color)
                        ) {
                            canMoveCoords.push(parseCoords(row, 2));
                        }
                        else if (
                            !isRook2gMoved &&
                            arr[row][5] === "" &&
                            arr[row][6] === "" &&
                            toSearchArr[row][7].startsWith(W)
                        ) {
                            canMoveCoords.push(parseCoords(row, 6));
                        }
                        else if (
                            !isRook1gMoved &&
                            toSearchArr[row][1] === "" &&
                            toSearchArr[row][2] === "" &&
                            toSearchArr[row][0].startsWith(B) &&
                            toSearchArr[row][3] === B + king
                        ) {
                            canMoveCoords.push(parseCoords(row, 1));
                        }
                        else if (!isRook2gMoved && arr[row][5] === "" && arr[row][6] === "" &&
                            toSearchArr[row][7].startsWith(B)) {
                            canMoveCoords.push(parseCoords(row, 5));
                        }
                    }
                };


                console.log(defaultSort, color, coords);


                if (color === W && coords.row === 7 && defaultSort) kingCastleMoves(isWKingMoved, isWRook1gMoved, isWRook2gMoved, 7, W)
                else if (color === B && coords.row === 7 && !defaultSort) kingCastleMoves(isBKingMoved, isBRook1gMoved, isBRook2gMoved, 7, B)
                else if (color === B && coords.row === 0 && defaultSort) kingCastleMoves(isBKingMoved, isBRook1gMoved, isBRook2gMoved, 0, B);
                else if (color === W && coords.row === 0 && !defaultSort) kingCastleMoves(isWKingMoved, isWRook1gMoved, isWRook2gMoved, 0, W);

                break;

            default:
                break;
        }
        return canMoveCoords;
    }

    const isChecked = ({ toSearchArr = arr, turn: turnValue = turn }: { toSearchArr?: string[][], turn?: boolean }) => {

        const moves = setMyMovesFunc(!turnValue, toSearchArr, true)
        const flatedAllMoves = moves.map(a => a.moves).flat()
        return hasCoords(flatedAllMoves, getKingPosition(getColorByTurn(turnValue), toSearchArr))
    }

    const getPieceMoves = (coords: ICoords, toSearchArr = arr, isChecking = false): ICoords[] => {
        const escapedMoves = escapedPawns.current.filter(({ from }) => {
            return compareCoords(from, coords)
        }).map(({ to: { row, column }, color }) => ({ column, row: row + (((color === B && defaultSort) || (color === W && !defaultSort)) ? 1 : -1) }))
        const generalMoves = getMovableCoords(coords, toSearchArr)

        let moves = [...generalMoves, ...escapedMoves]

        if (!isChecking) {
            moves = moves.filter(move => {
                const newArr = structuredClone(toSearchArr)
                return !isChecked({ toSearchArr: changeArr(coords, move, newArr).arr })
            })
        }
        return moves
    }

    const setMyMovesFunc = (turnn = turn, toSearchArr = arr, isChecking = false) => {
        const newAllMoves = allPieces(turnn, toSearchArr).map(coords => {
            return {
                coords,
                moves: getPieceMoves(coords, toSearchArr, isChecking)
            }
        })

        return newAllMoves
    }

    function toggleTurn(a?: boolean) {
        if (a !== undefined) setTurn(a)
        else setTurn(a => !a)
    }

    function isCoordsMovable({ row: rowFrom, column: columnFrom }: ICoords, { row: rowTo, column: columnTo }: ICoords) {
        const move = myMoves.find(moves => {
            const { row: rowToTest, column: columnToTest } = moves.coords
            return rowFrom === rowToTest && columnFrom === columnToTest
        })
        if (!move) return false

        return move.moves.find(({ row, column }) => {
            return row === rowTo && column === columnTo
        }) ? true : false
    }

    function move(from: ICoords, to: ICoords) {


        if (shouldPawnUpgrade.current || forcedWinner) return


        const { row: rowFrom, column: columnFrom } = from;
        const { row: rowTo, column: columnTo } = to;

        if (!isCoordsMovable(from, to)) return "Wrong move"

        const { arr: newArr, moveType } = changeArr(from, to)

        const [color, piece] = seperateBoxValue(newArr[rowTo][columnTo]);

        if (piece === rook) {
            const activateRook = (isRook1gMoved: boolean, setIsRook1gMoved: Function, isRook2gMoved: boolean, setIsRook2gMoved: Function, row: number) => {
                if (rowFrom === row && columnFrom === 0 && !isRook1gMoved) setIsRook1gMoved(true)
                else if (rowFrom === row && columnFrom === 7 && !isRook2gMoved) setIsRook2gMoved(true)
            }
            if (color === W) activateRook(
                isWRook1gMoved,
                (a: boolean) => setIsWRook1gMoved(a),
                isWRook2gMoved,
                (a: boolean) => setIsWRook2gMoved(a),
                7
            )

            else if (color === B) activateRook(
                isBRook1gMoved,
                (a: boolean) => setIsBRook1gMoved(a),
                isBRook2gMoved,
                (a: boolean) => setIsBRook2gMoved(a),
                0)
        }

        if (piece === pawn) {

            if ((color === B && defaultSort) || (color === W && !defaultSort)) {
                if (rowTo - rowFrom === 2 && rowTo === 3) {

                    const piece1 = columnTo >= 1 && newArr[rowTo][columnTo - 1]
                    const piece2 = columnTo <= 6 && newArr[rowTo][columnTo + 1]

                    if (piece1) {
                        const [pieceColor] = seperateBoxValue(piece1)
                        if ((pieceColor === W && defaultSort) || (pieceColor === B && !defaultSort)) {
                            escapedPawns.current.push({
                                from: parseCoords(rowTo, columnTo - 1),
                                to: parseCoords(rowTo, columnTo),
                                color: defaultSort ? W : B
                            })
                        }
                    }
                    if (piece2) {
                        const [pieceColor] = seperateBoxValue(piece2)
                        if ((pieceColor === W && defaultSort) || (pieceColor === B && !defaultSort)) {
                            escapedPawns.current.push({
                                from: parseCoords(rowTo, columnTo + 1),
                                to: parseCoords(rowTo, columnTo),
                                color: defaultSort ? W : B
                            })
                        }
                    }
                }
            }
            if ((color === W && defaultSort) || (color === B && !defaultSort)) {
                if (rowFrom - rowTo === 2 && rowTo === 4) {

                    const piece1 = columnTo >= 1 && newArr[rowTo][columnTo - 1]
                    const piece2 = columnTo <= 6 && newArr[rowTo][columnTo + 1]
                    if (piece1) {
                        const [pieceColor] = seperateBoxValue(piece1)
                        if ((pieceColor === B && defaultSort) || (pieceColor === W && !defaultSort)) {
                            escapedPawns.current.push({
                                from: parseCoords(rowTo, columnTo - 1),
                                to: parseCoords(rowTo, columnTo),
                                color: defaultSort ? B : W
                            })
                        }
                    }
                    if (piece2) {
                        const [pieceColor] = seperateBoxValue(piece2)
                        if ((pieceColor === B && defaultSort) || (pieceColor === W && !defaultSort)) {
                            escapedPawns.current.push({
                                from: parseCoords(rowTo, columnTo + 1),
                                to: parseCoords(rowTo, columnTo),
                                color: defaultSort ? B : W
                            })
                        }
                    }
                }
            }
        }

        if (piece === king) {

            const moveKing = (setIsKingMoved: Function) => {

                setIsKingMoved();

            };

            if (color === W) moveKing(() => setIsWKingMoved(true));
            else if (color === B) moveKing(() => setIsBKingMoved(true));
        }

        let boxCoord = coordsToBoardCoords(to)

        if (moveType === BIG_CASTLE) boxCoord = "O-O-O"
        if (moveType === SMALL_CASTLE) boxCoord = "O-O"

        if (shouldMove) {
            if (!shouldMove(from, to)) return
        }

        updateHistory(from, to, newArr, arr, boxCoord)
        setArr(newArr)
        toggleTurn()
        if (isPawnUpdating(from, to, newArr)) {
            shouldPawnUpgrade.current = true
        }
        onMove && onMove(turn)
    }

    function updateHistory(from: ICoords, to: ICoords, arr: string[][], oldArr: string[][], boxCoord?: string) {
        const toBoardCoords = coordsToBoardCoords(to)
        const piece = oldArr[to.row][to.column].slice(1)
        if (piece) {
            let boxCoord2 = piece === pawn ? coordsToBoardCoords(from)[0] : ""
            const amIPawn = oldArr[from.row][from.column] === pawn
            boxCoord = `${amIPawn ? boxCoord2 : ""}x${toBoardCoords}`
        }
        const checked = isChecked({ toSearchArr: arr, turn: piece[0] === B })

        setHistory(a => [...a, {
            from: {
                ...from,
                box: coordsToBoardCoords(from)
            },
            to: {
                ...to,
                box: toBoardCoords
            },
            boxCoord: (boxCoord || toBoardCoords) + (checked ? "+" : ""),
            piece: arr[to.row][to.column]
        }])
    }

    function isPawnUpdating({ row: rowFrom, column: columnFrom }: ICoords, { row: rowTo, column: columnTo }: ICoords, toSearchArr: string[][]) {
        return (arr[rowFrom][columnFrom].endsWith(pawn) && (rowTo === 0 || rowTo === 7) && Math.abs(rowFrom - rowTo) === 1)

    }

    function changeArr({ row: rowFrom, column: columnFrom }: ICoords, { row: rowTo, column: columnTo }: ICoords, toMoveArr: string[][] = arr): { arr: string[][], moveType: string } {
        const newArr = structuredClone(toMoveArr);
        const [color, piece] = seperateBoxValue(newArr[rowFrom][columnFrom]);

        let moveType = SIMPLE_MOVE



        const simpleMove = () => {
            newArr[rowTo][columnTo] = newArr[rowFrom][columnFrom];
            newArr[rowFrom][columnFrom] = "";
        };

        if (piece === pawn) {
            const escapedPawnKill = (rowIncrement: number) => {
                if (rowFrom - rowTo === rowIncrement && (Math.abs(columnTo - columnFrom) === 1) && newArr[rowTo][columnTo] === "") {
                    newArr[rowTo + rowIncrement][columnTo] = ""
                }
            }
            if ((color === W && defaultSort) || (color === B && !defaultSort)) escapedPawnKill(1)
            else escapedPawnKill(-1)
        }

        if (piece === king) {
            const smallCastle = () => {
                moveType = SMALL_CASTLE
                newArr[rowTo][6] = color + king;
                newArr[rowTo][5] = color + rook;

                newArr[rowTo][4] = "";
                newArr[rowTo][7] = "";
            };

            const bigCastle = () => {
                moveType = BIG_CASTLE
                newArr[rowTo][2] = color + king;
                newArr[rowTo][3] = color + rook;

                newArr[rowTo][0] = "";
                newArr[rowTo][4] = "";
            };

            const moveKing = (isKingMoved: boolean, row: number, color: string) => {

                if (!isKingMoved && columnFrom === 4) {
                    if (columnTo === 6 && rowTo === row && toMoveArr[rowTo][0] === color + rook) smallCastle();
                    else if (columnTo === 2 && rowTo === row && toMoveArr[rowTo][7] === color + rook) bigCastle();
                    else simpleMove();
                } else simpleMove();
            };

            if (color === W && defaultSort) moveKing(isWKingMoved, 7, W);
            else if (color === B && !defaultSort) moveKing(isBKingMoved, 7, B);
            else if (color === B && defaultSort) moveKing(isBKingMoved, 0, B);
            else if (color === W && !defaultSort) moveKing(isWKingMoved, 0, W);
        } else simpleMove();

        return { arr: newArr, moveType }
    };

    const myPieceMoves = (coords: ICoords) => {
        const movesX = shouldPawnUpgrade.current ? undefined : myMoves.find(move => {
            const { row: rowToCheck, column: columnToCheck } = move.coords
            const { row, column } = coords
            return row === rowToCheck && column === columnToCheck
        })
        return movesX || {
            moves: [],
            coords
        }
    }

    const isGameOverFunc = useCallback(() =>
        myMoves.length !== 0 && myMoves.map(a => a.moves).reduce((a, b) => a + b.length, 0) === 0, [myMoves])


    const clear = () => {
        setArr(generateArr(defaultSort))
        escapedPawns.current = []
        setTurn(defaultTurn)
        setIsWKingMoved(false)
        setIsWRook1gMoved(false)
        setIsWRook2gMoved(false)
        setIsBKingMoved(false)
        setIsBRook1gMoved(false)
        setIsBRook2gMoved(false)
        setIsLoading(false)
        setHistory([])
        setMyMoves(setMyMovesFunc(defaultTurn))
        setForcedWinner(null)
        onClear && onClear()
    }

    const upgradedPawn = (from: ICoords, to: ICoords, piece: string) => {
        const newArr = changeArr(from, to).arr
        const { row, column } = to
        newArr[row][column] = getColorByTurn(turn) + piece
        if (shouldMove) {
            if (!shouldMove(from, to)) return
        }
        updateHistory(from, to, newArr, arr)
        setArr(newArr)
        toggleTurn()
    }

    const setLoose = (turn: boolean) => {
        setForcedWinner(turn ? B : W)
    }

    useEffect(() => {
        setIsLoading(false)
        setMyMoves(setMyMovesFunc())
    }, [turn, arr])

    useDidMountEffect(() => {
        console.log("xxx");

        const timeout = setTimeout(() => {

            setArr(reverseArr(arr))
        }, 100)

        return () => clearTimeout(timeout)
    }, [defaultSort])

    useEffect(() => {
        setTurn(defaultTurn)
    }, [defaultTurn])


    const isWhiteChecked = isChecked({ turn: true })
    const isBlackChecked = isChecked({ turn: false })
    const isStalemate = useMemo(() => !isBoardValid(arr), [arr])
    const isGameOver = useMemo(() => (!isLoading && isGameOverFunc()) || forcedWinner !== null || isStalemate, [isLoading, isGameOverFunc, forcedWinner, isStalemate])
    const isWhiteWinner = useMemo(() => (isGameOver && !turn) || forcedWinner === W, [isGameOver, turn, forcedWinner])
    const isBlackWinner = useMemo(() => (isGameOver && turn) || forcedWinner === B, [isGameOver, turn, forcedWinner])

    return {
        arr,
        turn,
        myMoves: forcedWinner ? [] : myMoves,
        getPieceMoves: myPieceMoves,
        move,
        isWhiteChecked,
        isBlackChecked,
        isGameOver,
        isLoading,
        clear,
        history,
        isPawnUpdating,
        upgradedPawn,
        isWhiteWinner,
        isBlackWinner,
        setLoose,
        isStalemate
    }
}

export default useChess