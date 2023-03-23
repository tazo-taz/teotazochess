import React from 'react'
import styled from 'styled-components'
import { BoardProps } from './Borad.container.tsx'
import { getBoxColor, seperateBoxValue } from '../../utils/box'
import { RenderPieceElement } from '../RenderPieceElement'
import { B, colorsValues, king, W } from '../../utils/constants';
import useRedux from '../../utils/redux'
import UpgradePawn from './UpgradePawn'

interface IRowDiv {
    size: number
}


const Container = styled.div`
    border-radius: 5px;
    overflow: hidden;
`

const RowDiv = styled.div`
    --size: ${(p: IRowDiv) => p.size}px;
    display: grid;
    grid-template-columns: repeat(8, var(--size));
    grid-template-rows: repeat(1, var(--size));
     
    & > .singleBox {
        display: grid;
        place-items: center;
        border: 3px solid transparent;
        overflow: hidden;
    }

    & > .singleBox.checked {
        background-color: #f33f3f !important;
      }
`

export default function BoardComponent({ arr, press, isBoxActiveBox, isCoordsMovable, isWhiteChecked, isBlackChecked, size = 100 }: BoardProps) {
    const { activeColor } = useRedux()
    return (
        <>
            <UpgradePawn />
            <Container>
                {arr?.map((rowArr, row) => (
                    <RowDiv size={size}>
                        {rowArr.map((columnArr, column) => {
                            const coords = { row, column };
                            const divProps: any = {
                                className: "singleBox "
                            };



                            const [color, piece] = seperateBoxValue(columnArr)

                            press && (divProps.onClick = () => press(coords))
                            if (isBoxActiveBox && isBoxActiveBox(coords)) divProps.className += "active ";
                            if (isCoordsMovable && isCoordsMovable(coords)) {
                                if (arr[row][column]) divProps.className += "canKill ";
                                else divProps.className += "canMoveIn ";
                            }
                            if (piece === king) {
                                if (color === W && isWhiteChecked) divProps.className += "checked ";
                                if (color === B && isBlackChecked) divProps.className += "checked ";
                            }
                            let colorClassName = colorsValues[activeColor as keyof typeof colorsValues] + getBoxColor({ row, column })

                            divProps.className += colorClassName + " "

                            const RenderPieceElementProps = {
                                boxValue: `${columnArr[0]}-${columnArr.slice(1)}`,
                                className: "piece " + (color === W ? "white" : "black")
                            }

                            return <div {...divProps}>
                                <RenderPieceElement {...RenderPieceElementProps} />
                            </div>;
                        })}
                    </RowDiv>
                ))}
            </Container>
        </>
    )
}
