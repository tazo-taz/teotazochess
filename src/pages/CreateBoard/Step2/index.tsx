import { useContext, useEffect, useState } from 'react'
import { activeBoxType } from '../../../interfaces/game'
import { useBoolean } from '../../../tJS/customHooks'
import { copy } from '../../../tJS/functions'
import useChess from '../../../utils/chess'
import { IHistory } from '../../../utils/chess/chess'
import { puzzleLvls } from '../../../utils/constants'
import { CreateBoardContext } from '../context'
import Step2Component from './Step2.component'

export default function Step2() {
  const [isWhite, toggleIsWhite] = useBoolean(true)
  const { board, setStep } = useContext(CreateBoardContext)
  const [activeBox, setActiveBox] = useState<activeBoxType>(null)
  const [history, setHistory] = useState<IHistory[]>([])

  const chess = useChess({ defaultArr: board, defaultTurn: isWhite })

  const goBack = () => setStep(1)

  const restart = () => {
    chess.clear()
  }

  const save = () => {

    copy(JSON.stringify({ moves: history.map(({ from: { row, column }, to: { row: row1, column: column1 } }, inx) => ({ from: { row, column }, to: { row: row1, column: column1 } })), arr: board, turn: isWhite, id: puzzleLvls.length + 1 }))

  }

  useEffect(() => {
    setHistory(chess.history)
  }, [chess.history])

  const props = {
    isWhite, toggleIsWhite,
    chess, goBack, activeBox,
    setActiveBox, history,
    setHistory,
    restart,
    save
  }

  return (
    <Step2Component {...props} />
  )
}
