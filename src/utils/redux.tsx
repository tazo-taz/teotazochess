import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import reduxInterface from "../redux"
import { setHistoryDispatch, setUpgradedPawnDispatch, setUpgradedPawnColorDispatch, setWinnerColorDispatch, setIsCreatingNewGameDispatch, setMaxTimeDispatch, setActiveColorDispatch, setPiecesDispatch, setPuzzleLvlDispatch } from "../redux/game"
import { setIsGameOverModalOpenDispatch, setIsUpgradePawnModalOpenDispatch } from "../redux/modal"
import { IHistory } from "./chess/chess"

const useRedux = () => {
    const dispatch = useDispatch()

    const { history, upgradedPawn, upgradedPawnColor, winnerColor, isCreatingNewGame, maxTime, activeColor, pieces, puzzleLvl } = useSelector((a: reduxInterface) => a.game)

    const { isUpgradePawnModalOpen, isGameOverModalOpen } = useSelector((a: reduxInterface) => a.modal)

    const setHistory = useCallback((payload: IHistory[]) => setHistoryDispatch(dispatch, payload), [dispatch])

    const setIsUpgradePawnModalOpen = useCallback((payload: boolean) => setIsUpgradePawnModalOpenDispatch(dispatch, payload), [dispatch])

    const setUpgradedPawn = useCallback((payload: string | null) => setUpgradedPawnDispatch(dispatch, payload), [dispatch])

    const setUpgradedPawnColor = useCallback((payload: string | null) => setUpgradedPawnColorDispatch(dispatch, payload), [dispatch])

    const setIsGameOVerModalOpen = useCallback((payload: boolean) => setIsGameOverModalOpenDispatch(dispatch, payload), [dispatch])

    const setWinnerColor = useCallback((payload: string | null) => setWinnerColorDispatch(dispatch, payload), [dispatch])

    const setIsCreatingNewGame = useCallback((payload: boolean) => setIsCreatingNewGameDispatch(dispatch, payload), [dispatch])

    const setMaxTime = useCallback((payload: number | null) => setMaxTimeDispatch(dispatch, payload), [dispatch])

    const setActiveColor = useCallback((payload: number) => setActiveColorDispatch(dispatch, payload), [dispatch])

    const setPieces = useCallback((payload: number) => setPiecesDispatch(dispatch, payload), [dispatch])

    const setPuzzleLvl = useCallback((payload: number | null) => setPuzzleLvlDispatch(dispatch, payload), [dispatch])


    return {
        history, setHistory,
        isUpgradePawnModalOpen, setIsUpgradePawnModalOpen,
        upgradedPawn, setUpgradedPawn,
        upgradedPawnColor, setUpgradedPawnColor,
        isGameOverModalOpen, setIsGameOVerModalOpen,
        winnerColor, setWinnerColor,
        isCreatingNewGame, setIsCreatingNewGame,
        maxTime, setMaxTime,
        activeColor, setActiveColor,
        pieces, setPieces,
        puzzleLvl, setPuzzleLvl
    }
}
export default useRedux