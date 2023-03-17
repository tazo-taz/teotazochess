import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activeBoxType, ICoords, IEscapedPawn } from "../interfaces/game"
import reduxInterface from "../redux"
import { setActiveBoxDispatch, setArrDispatch, addEscapedPawnsDispatch, setIsBKingMovedDispatch, setIsBRook1gMovedDispatch, setIsBRook2gMovedDispatch, setIsWKingMovedDispatch, setIsWRook1gMovedDispatch, setIsWRook2gMovedDispatch, toggleTurnDispatch, removeEscapedPawnsByFromDispatch, removeEscapedPawnsByToDispatch, setSortDispatch } from "../redux/game"

const useRedux = () => {
    const dispatch = useDispatch()

    const { arr, turn, activeBox, isWKingMoved, isBKingMoved, isWRook1gMoved, isWRook2gMoved, isBRook1gMoved, isBRook2gMoved, escapedPawns, sort } = useSelector((a: reduxInterface) => a.game)

    const setArr = useCallback((payload: string[][]) => setArrDispatch(dispatch, payload), [dispatch])

    const toggleTurn = useCallback((payload?: boolean) => toggleTurnDispatch(dispatch, payload), [dispatch])

    const setActiveBox = useCallback((payload: activeBoxType) => setActiveBoxDispatch(dispatch, payload), [dispatch])

    const setIsWKingMoved = useCallback((payload: boolean) => setIsWKingMovedDispatch(dispatch, payload), [dispatch])

    const setIsBKingMoved = useCallback((payload: boolean) => setIsBKingMovedDispatch(dispatch, payload), [dispatch])

    const setIsWRook1gMoved = useCallback((payload: boolean) => setIsWRook1gMovedDispatch(dispatch, payload), [dispatch])

    const setIsWRook2gMoved = useCallback((payload: boolean) => setIsWRook2gMovedDispatch(dispatch, payload), [dispatch])

    const setIsBRook1gMoved = useCallback((payload: boolean) => setIsBRook1gMovedDispatch(dispatch, payload), [dispatch])

    const setIsBRook2gMoved = useCallback((payload: boolean) => setIsBRook2gMovedDispatch(dispatch, payload), [dispatch])

    const addEscapedPawns = useCallback((payload: IEscapedPawn) => addEscapedPawnsDispatch(dispatch, payload), [dispatch])

    const removeEscapedPawnsByFrom = useCallback((payload: ICoords) => removeEscapedPawnsByFromDispatch(dispatch, payload), [dispatch])

    const removeEscapedPawnsByTo = useCallback((payload: ICoords) => removeEscapedPawnsByToDispatch(dispatch, payload), [dispatch])

    const setSort = useCallback((payload: boolean) => setSortDispatch(dispatch, payload), [dispatch])


    return {
        arr, setArr,
        turn, toggleTurn,
        activeBox, setActiveBox,
        isWKingMoved, setIsWKingMoved,
        isBKingMoved, setIsBKingMoved,
        isWRook1gMoved, setIsWRook1gMoved,
        isWRook2gMoved, setIsWRook2gMoved,
        isBRook1gMoved, setIsBRook1gMoved,
        isBRook2gMoved, setIsBRook2gMoved,
        escapedPawns, addEscapedPawns, removeEscapedPawnsByFrom, removeEscapedPawnsByTo,
        sort, setSort
    }
}
export default useRedux