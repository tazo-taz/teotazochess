import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { IHistory } from "../utils/chess/chess";

export type winnerType = null | string

export interface gameInterface {
    isCreatingNewGame: boolean,
    history: IHistory[]
    upgradedPawn: string | null,
    upgradedPawnColor: string | null,
    winnerColor: string | null,
    maxTime: number,
    activeColor: number,
    pieces: number,
    puzzleLvl: number | null
}

export const initialState: gameInterface = {
    isCreatingNewGame: true,
    history: [],
    upgradedPawn: null,
    upgradedPawnColor: null,
    winnerColor: null,
    maxTime: 2,
    activeColor: 1,
    pieces: 1,
    puzzleLvl: null
};

const setIsCreatingNewGame = "setIsCreatingNewGame"
const setWinnerColor = "setWinnerColor"
const setUpgradedPawn = "setUpgradedPawn"
const setUpgradedPawnColor = "setUpgradedPawnColor"
const setHistory = "setHistory"
const setMaxTime = "setMaxTime"
const setActiveColor = "setActiveColor"
const setPieces = "setPieces"
const setPuzzleLvl = "setPuzzleLvl"

interface reducerObjInt {
    payload?: any,
    type: string
}

const reducer = (state = initialState, { payload, type }: reducerObjInt) => {
    switch (type) {
        case setHistory:
            return { ...state, history: payload };
        case setUpgradedPawn:
            return { ...state, upgradedPawn: payload };
        case setUpgradedPawnColor:
            return { ...state, upgradedPawnColor: payload };
        case setWinnerColor:
            return { ...state, winnerColor: payload };
        case setIsCreatingNewGame:
            return { ...state, isCreatingNewGame: payload };
        case setMaxTime:
            return { ...state, maxTime: payload };
        case setActiveColor:
            return { ...state, activeColor: payload };
        case setPieces:
            return { ...state, pieces: payload };
        case setPuzzleLvl:
            return { ...state, puzzleLvl: payload };
        default:
            return state;
    }
};

export const setHistoryDispatch = (dispatch: Dispatch<AnyAction>, payload: IHistory[]) => {
    dispatch({
        type: setHistory,
        payload
    })
}

export const setUpgradedPawnDispatch = (dispatch: Dispatch<AnyAction>, payload: string | null) => {
    dispatch({
        type: setUpgradedPawn,
        payload
    })
}

export const setUpgradedPawnColorDispatch = (dispatch: Dispatch<AnyAction>, payload: string | null) => {
    dispatch({
        type: setUpgradedPawnColor,
        payload
    })
}

export const setWinnerColorDispatch = (dispatch: Dispatch<AnyAction>, payload: string | null) => {
    dispatch({
        type: setWinnerColor,
        payload
    })
}

export const setIsCreatingNewGameDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsCreatingNewGame,
        payload
    })
}

export const setMaxTimeDispatch = (dispatch: Dispatch<AnyAction>, payload: number | null) => {
    dispatch({
        type: setMaxTime,
        payload
    })
}

export const setActiveColorDispatch = (dispatch: Dispatch<AnyAction>, payload: number) => {
    dispatch({
        type: setActiveColor,
        payload
    })
}

export const setPiecesDispatch = (dispatch: Dispatch<AnyAction>, payload: number) => {
    dispatch({
        type: setPieces,
        payload
    })
}

export const setPuzzleLvlDispatch = (dispatch: Dispatch<AnyAction>, payload: number | null) => {
    dispatch({
        type: setPuzzleLvl,
        payload
    })
}

export default reducer;
