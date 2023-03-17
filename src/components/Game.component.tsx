import React from 'react'
import { ICoords } from '../interfaces/game';
import { seperateBoxValue } from '../utils/box';
import { B, king, W } from '../utils/constants';

interface IProps {
    arr: string[][],
    isBoxActiveBox: Function,
    isBoxMovable: (e: ICoords) => undefined | ICoords,
    parseCoords: (row: number, column: number) => ICoords,
    getPieceElement: (a: string) => JSX.Element | undefined,
    press: (coords: ICoords) => void,
    isBKingChecked: boolean,
    isWKingChecked: boolean,
}

export default function GameComponent({
    arr, isBoxActiveBox,
    isBoxMovable,
    parseCoords,
    getPieceElement,
    press,
    isBKingChecked,
    isWKingChecked,
}: IProps) {
    return (
        <div className='App'>
            {arr?.map((rowArr, row) => (
                <div>
                    {rowArr.map((columnArr, column) => {
                        const coords = { row, column };
                        const divProps: any = {
                            className: ""
                        };

                        divProps.onClick = () => press(coords);
                        if (isBoxActiveBox(coords)) divProps.className += "active ";
                        if (isBoxMovable(parseCoords(row, column))) {
                            if (arr[row][column]) divProps.className += "canKill ";
                            else divProps.className += "canMoveIn ";
                        }

                        const [color, piece] = seperateBoxValue(columnArr)
                        if (piece === king) {
                            if (color === W && isWKingChecked) divProps.className += "checked ";
                            if (color === B && isBKingChecked) divProps.className += "checked ";
                        }
                        let colorClassName = ""
                        if (row % 2 === 0) {
                            if (column % 2 === 0) colorClassName = "whitebox"
                            else colorClassName = "darkbox"
                        } else {
                            if (column % 2 !== 0) colorClassName = "whitebox"
                            else colorClassName = "darkbox"
                        }
                        divProps.className += colorClassName + " "

                        return <div {...divProps}>{getPieceElement(columnArr)}</div>;
                    })}
                </div>
            ))}
        </div>
    )
}
