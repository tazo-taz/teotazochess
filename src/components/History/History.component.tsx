import React from 'react'
import { mergeClassNames } from '../../tJS/functions'
import { IHistory } from '../../utils/chess/chess'
import { pawn, piecesValues } from '../../utils/constants'
import useRedux from '../../utils/redux'
import { RenderPieceElement } from '../RenderPieceElement'
import style from "./style.module.css"

interface IProps {
    history: IHistory[]
}

export default function HistoryComponent({ history }: IProps) {
    const newHistory: [IHistory, IHistory][] = history.reduce((a: any, b) => {
        let lastOne = a.slice(-1)[0]
        if (lastOne?.length > 1 || !lastOne) {
            a.push([])
        }

        lastOne = a.slice(-1)[0]
        lastOne.push(b)

        return a
    }, [])

    const { pieces } = useRedux()





    return (
        <div className={style.container}>
            <h2 className={`${style.padding} ${style.header}`}>History</h2>
            <div className={style.content}>
                {newHistory.map((a, b) => {
                    const RenderPieceElementProps = {
                        className: style.piece,
                    }

                    const first = a[0]
                    const second = a[1]

                    const renderSingle = (a: IHistory) => {
                        const boxValue = a.piece[0] + "-" + a.piece.slice(1)

                        const isNotPawn = !boxValue.endsWith(pawn)
                        return <div className={style.singleMoveEach}>
                            {isNotPawn &&
                                <RenderPieceElement boxValue={boxValue} {...RenderPieceElementProps} />
                            }
                            <div className={mergeClassNames(isNotPawn && style.notPawn, style.pawnName)}>
                                {a.boxCoord}
                            </div>
                        </div>
                    }

                    return <div className={style.singleMove}>
                        {renderSingle(first)}
                        {second && renderSingle(second)}
                    </div>
                })}
            </div>
        </div>
    )
}
