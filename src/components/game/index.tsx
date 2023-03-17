import { useCallback, useEffect, useMemo } from "react";
import GameComponent from "../Game.component";
import useRedux from "../../utils/redux";
import { ICanMoveCoords, ICoords } from "../../interfaces/game";
import { generateArr, generateCoordsArr, getColorByTurn, getCoordsFromIndex, getOpponentColor, getPieceElement, parseCoords, seperateBoxValue } from "../../utils/box";
import { B, bishop, EscapedPawn, king, knight, pawn, queen, rook, W } from "../../utils/constants";


export default function App() {
    const {
        arr, setArr,
        turn, toggleTurn,
        activeBox, setActiveBox,
        isWKingMoved, setIsWKingMoved,
        isBKingMoved, setIsBKingMoved,
        isWRook1gMoved, setIsWRook1gMoved,
        isWRook2gMoved, setIsWRook2gMoved,
        isBRook1gMoved, setIsBRook1gMoved,
        isBRook2gMoved, setIsBRook2gMoved,
        escapedPawns, addEscapedPawns, removeEscapedPawnsByFrom, removeEscapedPawnsByTo,
        sort
    } = useRedux()

    const activeColor = getColorByTurn(turn)

    let isBKingChecked: any
    let isWKingChecked: any

    function press(coords: ICoords) {
        const { row, column } = coords;
        const [color] = seperateBoxValue(arr[row][column])

        if ((color === W && turn) || (color === B && !turn)) {
            setActiveBox(coords);
        } else if (activeBox) {
            move(coords);
        }
    };

    function getKingPosition(color: string, toSearchArr = arr) {
        return generateCoordsArr().flat().findIndex(({ row, column }) => toSearchArr[row][column] === color + king)
    }

    function getMovableCoords(coords: ICoords, toSearchArr = arr) {
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
                if (color === W) {
                    if (row >= 1 && !toSearchArr[row - 1][column])
                        canMoveCoords.push(parseCoords(row - 1, column));
                    if (row >= 2 && !toSearchArr[row - 2][column] && row === 6)
                        canMoveCoords.push(parseCoords(row - 2, column));
                    if (column > 0 && toSearchArr[row - 1][column - 1].startsWith(B))
                        canMoveCoords.push(parseCoords(row - 1, column - 1));
                    if (column < 7 && toSearchArr[row - 1][column + 1].startsWith(B))
                        canMoveCoords.push(parseCoords(row - 1, column + 1));
                } else {
                    if (row <= 6 && !toSearchArr[row + 1][column])
                        canMoveCoords.push(parseCoords(row + 1, column));
                    if (row <= 5 && !toSearchArr[row + 2][column] && row === 1)
                        canMoveCoords.push(parseCoords(row + 2, column));
                    if (column > 0 && row <= 6 && toSearchArr[row + 1][column - 1].startsWith(W))
                        canMoveCoords.push(parseCoords(row + 1, column - 1));
                    if (column < 7 && row <= 6 && toSearchArr[row + 1][column + 1].startsWith(W))
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
                    row: number
                ) => {
                    if (!isKingMoved) {
                        if (
                            !isRook1gMoved &&
                            toSearchArr[row][1] === "" &&
                            toSearchArr[row][2] === "" &&
                            toSearchArr[row][3] === ""
                        )
                            canMoveCoords.push(parseCoords(row, 2));
                        if (!isRook2gMoved && arr[row][5] === "" && arr[row][6] === "")
                            canMoveCoords.push(parseCoords(row, 6));
                    }
                };

                color === W
                    ? kingCastleMoves(isWKingMoved, isWRook1gMoved, isWRook2gMoved, 7)
                    : kingCastleMoves(isBKingMoved, isBRook1gMoved, isBRook2gMoved, 0);

                break;

            default:
                break;
        }

        return canMoveCoords;
    }

    function playersMovableCoords(color: string, toSearchArr = arr) {
        let allMoves: ICoords[] = []
        const allCoords = generateCoordsArr().flat().filter(({ row, column }) => toSearchArr[row][column].startsWith(color))

        allCoords.forEach(coords => {
            allMoves = [...allMoves, ...getMovableCoords(coords, toSearchArr)]
        })

        return allMoves
    }

    function opponentPlayersMovableCoords(color: string, toSearchArr = arr) {
        return playersMovableCoords(getOpponentColor(color), toSearchArr)
    }

    function isKingInDangerours(color: string, toSearchArr = arr) {
        if (!toSearchArr.length) return false

        const allMoves = opponentPlayersMovableCoords(color, toSearchArr)

        const { row: rowKing, column: columnKing } = getCoordsFromIndex(getKingPosition(color, toSearchArr))
        return allMoves.find(({ row, column }) => row === rowKing && column === columnKing)
    }

    isBKingChecked = isKingInDangerours(B)
    isWKingChecked = isKingInDangerours(W)



    function activeBoxPuttableCoords() {
        if (!activeBox) return []
        let movinableCoords = getMovableCoords(activeBox)

        const filterIfChecked = (isChecked: boolean, color: string) => {
            if (isChecked) {
                movinableCoords = movinableCoords.filter((coords: ICoords) => {
                    const newArr = structuredClone(arr)
                    return !(isKingInDangerours(color, moveChangedArrNoCheck(activeBox, coords, newArr)))
                })
            }
        }

        filterIfChecked(isBKingChecked, B)
        filterIfChecked(isWKingChecked, W)

        return movinableCoords.filter((coords) => {
            const tempArr = structuredClone(arr)
            return !(isKingInDangerours(activeColor, moveChangedArrNoCheck(activeBox, coords, tempArr)))
        })
    }



    let movinableCoords: ICanMoveCoords[] = activeBoxPuttableCoords();
    console.log(movinableCoords);

    function moveChangedArrNoCheck({ row: rowFrom, column: columnFrom }: ICoords, { row, column }: ICoords, toMoveArr: string[][] = arr): string[][] | undefined {
        const newArr = structuredClone(toMoveArr);
        const [color, piece] = seperateBoxValue(newArr[rowFrom][columnFrom]);

        const simpleMove = () => {
            newArr[row][column] = newArr[rowFrom][columnFrom];
            newArr[rowFrom][columnFrom] = "";
        };

        if (piece === king) {
            const smallCastle = (row: number) => {
                newArr[row][6] = color + king;
                newArr[row][5] = color + rook;

                newArr[row][4] = "";
                newArr[row][7] = "";
            };

            const bigCastle = (row: number) => {
                newArr[row][2] = color + king;
                newArr[row][3] = color + rook;

                newArr[row][0] = "";
                newArr[row][4] = "";
            };

            const moveKing = (isKingMoved: boolean, row: number) => {

                if (!isKingMoved) {
                    if (column === 6) smallCastle(row);
                    else if (column === 2) bigCastle(row);
                    else simpleMove();
                } else simpleMove();
            };

            if (color === W) moveKing(isWKingMoved, 7);
            else if (color === B) moveKing(isBKingMoved, 0);
        } else simpleMove();

        return newArr
    };

    function moveChangedArr(coordsFrom: ICoords, coordsTo: ICoords, toMoveArr: string[][] = arr): string[][] | undefined {
        const boxMovable = isBoxMovable(coordsTo)
        if (!boxMovable) return

        return moveChangedArrNoCheck(coordsFrom, coordsTo, toMoveArr)
    };

    function move({ row, column }: ICoords, toMoveArr = arr) {

        if (!activeBox) return
        const { row: rowFrom, column: columnFrom } = activeBox;

        const newArr = moveChangedArr(activeBox, { row, column }, toMoveArr)

        // tu sheudzlia gadasvla abrunebs gadasul arrays, tu ar sheudzlia undefined
        if (!newArr) return setActiveBox(null)

        const [color, piece] = seperateBoxValue(newArr[row][column]);
        const boxMovable = isBoxMovable({ row, column })


        if (piece === rook) {
            const activateRook = (isRook1gMoved: boolean, setIsRook1gMoved: Function, isRook2gMoved: boolean, setIsRook2gMoved: Function, row: number) => {
                if (rowFrom === row && columnFrom === 0 && !isRook1gMoved) setIsRook1gMoved(true)
                else if (rowFrom === row && columnFrom === 7 && !isRook2gMoved) setIsRook2gMoved(true)
            }
            if (color === W) activateRook(isWRook1gMoved, setIsWRook1gMoved, isWRook2gMoved, setIsWRook2gMoved, 7)
            else if (color === B) activateRook(isBRook1gMoved, setIsBRook1gMoved, isBRook2gMoved, setIsBRook2gMoved, 0)
        }

        if (piece === pawn) {
            if (color === B) {
                if (row - rowFrom === 2 && row === 3) {

                    const piece1 = column >= 1 && newArr[row][column - 1]
                    const piece2 = column <= 6 && newArr[row][column + 1]

                    if (piece1) {
                        const [pieceColor] = seperateBoxValue(piece1)
                        if (pieceColor === W) {
                            addEscapedPawns({
                                from: parseCoords(row, column - 1),
                                to: parseCoords(row, column),
                                type: W + EscapedPawn
                            })
                        }
                    }
                    if (piece2) {
                        const [pieceColor] = seperateBoxValue(piece2)
                        if (pieceColor === W) {
                            addEscapedPawns({
                                from: parseCoords(row, column + 1),
                                to: parseCoords(row, column),
                                type: W + EscapedPawn
                            })
                        }
                    }
                }
            }
            if (color === W) {
                if (rowFrom - row === 2 && row === 4) {

                    const piece1 = column >= 1 && newArr[row][column - 1]
                    const piece2 = column <= 6 && newArr[row][column + 1]
                    if (piece1) {
                        const [pieceColor] = seperateBoxValue(piece1)
                        if (pieceColor === B) {
                            addEscapedPawns({
                                from: parseCoords(row, column - 1),
                                to: parseCoords(row, column),
                                type: B + EscapedPawn
                            })
                        }
                    }
                    if (piece2) {
                        const [pieceColor] = seperateBoxValue(piece2)
                        if (pieceColor === B) {
                            addEscapedPawns({
                                from: parseCoords(row, column + 1),
                                to: parseCoords(row, column),
                                type: B + EscapedPawn
                            })
                        }
                    }
                }
            }

            if (boxMovable?.type === EscapedPawn) {
                color === W && (newArr[row + 1][column] = "")
                color === B && (newArr[row - 1][column] = "")
            }
        }

        if (piece === king) {

            const moveKing = (setIsKingMoved: Function) => {

                setIsKingMoved(true);

            };

            if (color === W) moveKing(setIsWKingMoved);
            else if (color === B) moveKing(setIsBKingMoved);
        }

        removeEscapedPawnsByFrom({ row: rowFrom, column: columnFrom })
        removeEscapedPawnsByTo({ row: rowFrom, column: columnFrom })

        setArr(newArr);
        setActiveBox({ row, column });
        toggleTurn();
    };


    function activeBoxKillableEscapedPawns() {
        if (!activeBox) return
        let { row: rowActive, column: columnActive } = activeBox
        const match = escapedPawns.find(a => a.from.row === rowActive && a.from.column === columnActive)
        if (!match) return
        const { to: { row, column }, type } = match

        const [color, typeValue] = seperateBoxValue(type)

        if (EscapedPawn === typeValue) {
            if (color === W) return { row: row - 1, column, type: typeValue }
            else return { row: row + 1, column, type: typeValue }
        }
    }


    function isCheckmated() {
        if (!arr.length || !activeBox) return false
        console.log(activeColor);

        console.log(playersMovableCoords(activeColor).filter((coords) => {
            const tempArr = structuredClone(arr)
            return !(isKingInDangerours(activeColor, moveChangedArrNoCheck(activeBox, coords, tempArr)))
        }))



    }

    isCheckmated()

    const escapedPawn = activeBoxKillableEscapedPawns()
    escapedPawn && movinableCoords.push(escapedPawn)

    if (activeBox) {
        const { row, column } = activeBox
        const [color] = seperateBoxValue(arr[row][column])
        if (!turn && color === W) movinableCoords = []
        else if (turn && color === B) movinableCoords = []
    }


    function isBoxActiveBox({ row, column }: ICoords) {
        if (!activeBox) return false;
        const { row: activeRow, column: activeColumn } = activeBox;
        return row === activeRow && column === activeColumn;
    };

    function isBoxMovable({ row, column }: ICoords) { return movinableCoords.find((a) => a.row === row && a.column === column) }



    useEffect(() => {
        setArr(generateArr())
    }, [])

    const GameComponentProps = {
        arr,
        isBoxActiveBox,
        isBoxMovable,
        parseCoords,
        getPieceElement,
        press,
        isBKingChecked,
        isWKingChecked,
    }

    return (
        <GameComponent {...GameComponentProps} />
    );
}
