import React, { useContext, useEffect } from 'react'
import CreatingGameComponent from './CreatingGame.component'
import useRedux from '../../utils/redux';
import { ChessContext } from '../../context/chessContext';
import { maxTimeValue } from '../../utils/box';

export default function CreatingGame() {
    const {
        maxTime, setMaxTime,
        activeColor, setActiveColor,
        pieces, setPieces,
        setIsCreatingNewGame
    } = useRedux()

    const { chess, wResume, wStop } = useContext(ChessContext)

    const maxTimeVal = maxTimeValue(maxTime)

    const startPlaying = () => {
        setIsCreatingNewGame(false)
        maxTimeVal && wResume()
    }

    const CreatingGameComponentProps = {
        maxTime,
        setMaxTime,
        activeColor,
        setActiveColor,
        pieces,
        setPieces,
        startPlaying
    }



    useEffect(() => {
        setMaxTime(2)
        setActiveColor(1)
        setPieces(1)
        chess.clear()
        maxTimeVal && wStop()
    }, [])


    return (
        <CreatingGameComponent {...CreatingGameComponentProps} />
    )
}
