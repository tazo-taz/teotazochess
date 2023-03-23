import { useContext } from 'react'
import { ChessContext } from '../../context/chessContext'
import { parseSeconds } from '../../tJS/functions'
import { Div, Flex } from '../../tJS/styledComponents'
import { maxTimeValue } from '../../utils/box'
import { king, piecesValues, queen, W } from '../../utils/constants'
import useRedux from '../../utils/redux'
import { WhiteButtonOutline } from '../Button'
import { RenderPieceElement } from '../RenderPieceElement'
import MyModal from './MyModal'

export default function GameOver(props: any) {
    const { isGameOverModalOpen, setIsGameOVerModalOpen, winnerColor, maxTime, pieces } = useRedux()
    const { chess, wSeconds, bSeconds } = useContext(ChessContext)

    let winnerTime: null | string = null
    const isWinnerWhite = winnerColor === W
    const winnerSeconds = isWinnerWhite ? wSeconds : bSeconds
    const loserSeconds = !isWinnerWhite ? wSeconds : bSeconds

    const maxTimeVal = maxTimeValue(maxTime)
    if (loserSeconds !== 0) maxTimeVal && winnerColor && (winnerTime = "in " + parseSeconds(maxTimeVal * 60 - (winnerSeconds)))
    else winnerTime = "by timeout"
    const pieceType = piecesValues[pieces as keyof typeof piecesValues]

    return (
        <MyModal
            open={isGameOverModalOpen}
            setOpen={setIsGameOVerModalOpen}
            {...props}
        >
            {(close: Function) => <Flex flexDirection='column' gap={10}>
                <Div textAlign='center' color='white' fontSize={30} mb={10}>Game over</Div>
                <Flex flexDirection='column' alignitems='center' gap={15}>
                    <WhiteButtonOutline onClick={() => {
                        close()
                        setTimeout(() => {
                            chess.clear()
                        }, 300)
                    }}>Play again</WhiteButtonOutline>
                    {chess.isStalemate ? <Div mb={-5} fontSize={20} fontWeight='bold' color='white'>The match is stalemate</Div> :
                        <Div mb={-5} fontSize={20} fontWeight='bold' color='white'>{isWinnerWhite ? "White" : "Black"} won {winnerTime}</Div>
                    }
                    <Flex gap={15}>
                        <RenderPieceElement className='gameOverPiece' boxValue={`${winnerColor}-${pieceType}-${king}`} />
                        <RenderPieceElement className='gameOverPiece' boxValue={`${winnerColor}-${pieceType}-${queen}`} />
                    </Flex>
                </Flex>
            </Flex>}
        </MyModal>
    )
}
