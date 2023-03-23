import React, { useContext, useEffect } from 'react'
import { activeBoxType, ICoords } from '../../interfaces/game';
import { generateArr, seperateBoxValue } from '../../utils/box';
import { chessFunctions } from '../../utils/chess';
import { IUseChess } from '../../utils/chess/chess';
import { B, W } from '../../utils/constants';
import useRedux from '../../utils/redux';
import BoardComponent from './Board.component';
import { BoardContext } from './context';

const { compareCoords } = chessFunctions

export interface BoardProps {
    arr?: string[][],
    press?: (a: ICoords) => void,
    isBoxActiveBox?: (a: ICoords) => boolean,
    isCoordsMovable?: (a: ICoords) => boolean,
    size?: number,
    isWhiteChecked?: boolean,
    isBlackChecked?: boolean,
    moveOnlyWhite?: boolean
}

export interface IBoardContainer extends BoardProps {
    chess?: IUseChess,
    activeBox?: activeBoxType,
    setActiveBox?: Function,
    isPawnUpdating?: Function,
    move?: Function,
    setHistory?: Function,
    onGameOver?: Function,
    moveOnlyWhite?: boolean,
    moveOnlyBlack?: boolean,
}





export default function BoardContainer({
    arr,
    chess,
    activeBox,
    setActiveBox = () => ({}),
    size = 100,
    onGameOver = () => { },
    moveOnlyWhite,
    moveOnlyBlack,
}: IBoardContainer) {
    const { setIsUpgradePawnModalOpen, upgradedPawn, setUpgradedPawn, setUpgradedPawnColor, toUpgradedPawnCoords } = useContext(BoardContext)

    const {
        arr: arr2 = generateArr(),
        turn = false,
        getPieceMoves = (c: ICoords) => ({
            coords: { row: 1, column: 2 },
            moves: []
        }),
        move = () => undefined,
        isWhiteChecked = false,
        isBlackChecked = false,
        isWhiteWinner = false,
        isGameOver = false,
        isPawnUpdating = () => false,
        upgradedPawn: upgradedPawnFunc = (from: ICoords, to: ICoords, piece: string) => { },
    } = chess || {}

    const newArr = arr === undefined ? arr2 : arr
    let pieceMoves = activeBox ? getPieceMoves(activeBox).moves : []

    function press(coords: ICoords) {
        const { row, column } = coords;
        const [color] = seperateBoxValue(newArr[row][column])

        if ((color === W && turn) || (color === B && !turn)) {
            if ((moveOnlyWhite && newArr[row][column].startsWith(B)) || (moveOnlyBlack && newArr[row][column].startsWith(W))) return
            setActiveBox(coords);
        } else if (activeBox) {
            const { row, column } = activeBox;
            const [myColor] = seperateBoxValue(newArr[row][column])
            if (isPawnUpdating(activeBox, coords, newArr)) {

                setUpgradedPawnColor(myColor)
                setIsUpgradePawnModalOpen(true)
                toUpgradedPawnCoords.current = coords
            } else {
                move(activeBox, coords)
                setActiveBox(null)
            }
        }
    };

    function isBoxActiveBox(coords: ICoords) {
        if (!activeBox) return false;
        return compareCoords(coords, activeBox)
    };

    function isCoordsMovable(coords: ICoords) {
        return pieceMoves.find((a: any) => compareCoords(a, coords)) ? true : false
    }

    useEffect(() => {
        if (toUpgradedPawnCoords.current && activeBox && upgradedPawn) {
            upgradedPawnFunc(activeBox, toUpgradedPawnCoords.current, upgradedPawn)
            setUpgradedPawn(null)
            toUpgradedPawnCoords.current = null
        }

    }, [upgradedPawn, activeBox, setUpgradedPawn])

    useEffect(() => {
        if (isGameOver) {
            onGameOver(isWhiteWinner ? W : B)
        }

    }, [isGameOver, isWhiteWinner])

    const BoardProps = {
        size,
        arr: newArr,
        press,
        isBoxActiveBox,
        isWhiteChecked,
        isBlackChecked,
        isCoordsMovable,
    }

    return (
        <BoardComponent {...BoardProps} />
    )
}