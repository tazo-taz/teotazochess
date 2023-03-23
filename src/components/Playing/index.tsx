import GameComponent from "./Playing.component";
import useRedux from "../../utils/redux";
import { activeBoxType } from "../../interfaces/game";
import { B, W } from "../../utils/constants";
import { useContext, useEffect, useState } from "react";
import { ChessContext } from "../../context/chessContext";


export default function Playing() {
    const {
        setHistory,
        setIsGameOVerModalOpen,
        setWinnerColor,
    } = useRedux()

    const [activeBox, setActiveBox] = useState<activeBoxType>(null)

    const { chess, toUpgradedPawnCoords } = useContext(ChessContext)

    const { history } = chess

    useEffect(() => {
        setHistory(history)
    }, [history, setHistory])

    const onGameOver = (isWhiteWinner: boolean) => {
        setIsGameOVerModalOpen(true)
        setWinnerColor(isWhiteWinner ? W : B)
    }

    const BoardProps = {
        activeBox,
        setActiveBox,
        toUpgradedPawnCoords,
        setHistory,
        chess,
        onGameOver
    }

    return (
        <GameComponent {...BoardProps} />
    );
}
