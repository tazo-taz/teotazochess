import { useEffect, useRef, useState } from "react";
import { ChessContext } from "../../context/chessContext";
import { activeBoxType } from "../../interfaces/game";
import { useTimer } from "../../tJS/customHooks";
import { maxTimeValue } from "../../utils/box";
import useChess from "../../utils/chess";
import useRedux from "../../utils/redux";
import GameComponent from "./Game.component";

function Game() {
    const { setUpgradedPawn, setUpgradedPawnColor, setWinnerColor, isCreatingNewGame, maxTime, setIsCreatingNewGame } = useRedux()

    const toUpgradedPawnCoords = useRef<activeBoxType>(null)
    const [defaultSort, setDefaultSort] = useState(true)

    const maxTimeVal = maxTimeValue(maxTime)

    const { seconds: wSeconds, resume: wResume, stop: wStop, reset: wReset } = useTimer((maxTimeVal || 1) * 60)
    const { seconds: bSeconds, resume: bResume, stop: bStop, reset: bReset } = useTimer((maxTimeVal || 1) * 60)
    console.log(defaultSort);

    const chess = useChess({
        defaultSort,
        onClear: () => {
            setWinnerColor(null)
            toUpgradedPawnCoords.current = null
            setUpgradedPawnColor(null)
            setUpgradedPawn(null)
            if (maxTimeVal) {
                wReset()
                bReset()
                bStop()
                wResume()
            }
        },
        onMove: (turn: boolean) => {
            if (maxTimeVal) {
                if (turn) {
                    wStop()
                    bResume()
                } else {
                    bStop()
                    wResume()
                }
            }
        },
    })

    const { isGameOver } = chess

    const GameComponentProps = {
        isCreatingNewGame
    }

    const ChessContextProviderValue = {
        chess,
        toUpgradedPawnCoords,
        wSeconds, wResume, wStop, wReset,
        bSeconds, bResume, bStop, bReset,
    }

    useEffect(() => {
        if (isGameOver) {
            wStop()
            bStop()
        }
    }, [isGameOver, bStop, wStop])

    useEffect(() => {
        wSeconds === 0 && chess.setLoose(true)
        bSeconds === 0 && chess.setLoose(false)
    }, [wSeconds, bSeconds, chess])

    useEffect(() => {
        return () => setIsCreatingNewGame(true)
    }, [])

    useEffect(() => {
        setDefaultSort(chess.turn);

    }, [chess.turn])

    return (
        <ChessContext.Provider value={ChessContextProviderValue}>
            <GameComponent {...GameComponentProps} />
        </ChessContext.Provider>
    );
}

export default Game;
