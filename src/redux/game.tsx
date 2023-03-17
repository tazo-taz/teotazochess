import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { activeBoxType, ICoords, IEscapedPawn } from "../interfaces/game";

export type winnerType = null | string

export interface gameInterface {
    arr: string[][],
    turn: boolean,
    activeBox: activeBoxType,
    isWKingMoved: boolean,
    isBKingMoved: boolean,
    isWRook1gMoved: boolean,
    isWRook2gMoved: boolean,
    isBRook1gMoved: boolean,
    isBRook2gMoved: boolean,
    escapedPawns: IEscapedPawn[],
    sort: boolean
}

export const initialState: gameInterface = {
    arr: [],
    turn: true,
    activeBox: null,
    isWKingMoved: false,
    isBKingMoved: false,
    isWRook1gMoved: false,
    isWRook2gMoved: false,
    isBRook1gMoved: false,
    isBRook2gMoved: false,
    escapedPawns: [],
    sort: true,
};

const setArr = "setArr"
const toggleTurn = "toggleTurn"
const setActiveBox = "setActiveBox"
const setIsWKingMoved = "setIsWKingMoved"
const setIsBKingMoved = "setIsBKingMoved"
const setIsWRook1gMoved = "setIsWRook1gMoved"
const setIsWRook2gMoved = "setIsWRook2gMoved"
const setIsBRook1gMoved = "setIsBRook1gMoved"
const setIsBRook2gMoved = "setIsBRook2gMoved"
const addEscapedPawns = "addEscapedPawns"
const removeEscapedPawnsByFrom = "removeEscapedPawnsByFrom"
const removeEscapedPawnsByTo = "removeEscapedPawnsByTo"
const setSort = "setSort"

interface reducerObjInt {
    payload?: any,
    type: string
}

const toggle = (state: gameInterface, key: string, payload: boolean) => ({ ...state, [key]: payload ? payload : !state[key as keyof gameInterface] })

const reducer = (state = initialState, { payload, type }: reducerObjInt) => {
    switch (type) {
        case setArr:
            return { ...state, arr: payload };
        case toggleTurn:
            return toggle(state, "turn", payload)
        case setActiveBox:
            return { ...state, activeBox: payload };
        case setIsWKingMoved:
            return { ...state, isWKingMoved: payload };
        case setIsBKingMoved:
            return { ...state, isBKingMoved: payload };
        case setIsWRook1gMoved:
            return { ...state, isWRook1gMoved: payload };
        case setIsWRook2gMoved:
            return { ...state, isWRook2gMoved: payload };
        case setIsBRook1gMoved:
            return { ...state, isBRook1gMoved: payload };
        case setIsBRook2gMoved:
            return { ...state, isBRook2gMoved: payload };
        case addEscapedPawns:
            return { ...state, escapedPawns: [...state.escapedPawns, payload] };
        case removeEscapedPawnsByFrom:
            return { ...state, escapedPawns: state.escapedPawns.filter(({ from: { row, column } }) => !(row === payload.row && column === payload.column)) };
        case removeEscapedPawnsByTo:
            return { ...state, escapedPawns: state.escapedPawns.filter(({ to: { row, column } }) => !(row === payload.row && column === payload.column)) };
        case setSort:
            return { ...state, sort: payload };
        default:
            return state;
    }
};


export const setArrDispatch = (dispatch: Dispatch<AnyAction>, payload: string[][]) => {
    dispatch({
        type: setArr,
        payload
    })
}

export const toggleTurnDispatch = (dispatch: Dispatch<AnyAction>, payload?: boolean) => {
    dispatch({
        type: toggleTurn,
        payload
    })
}

export const setActiveBoxDispatch = (dispatch: Dispatch<AnyAction>, payload: activeBoxType) => {
    dispatch({
        type: setActiveBox,
        payload
    })
}

export const setIsWKingMovedDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsWKingMoved,
        payload
    })
}

export const setIsBKingMovedDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsBKingMoved,
        payload
    })
}

export const setIsWRook1gMovedDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsWRook1gMoved,
        payload
    })
}

export const setIsWRook2gMovedDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsWRook2gMoved,
        payload
    })
}

export const setIsBRook1gMovedDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsBRook1gMoved,
        payload
    })
}

export const setIsBRook2gMovedDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsBRook2gMoved,
        payload
    })
}

export const addEscapedPawnsDispatch = (dispatch: Dispatch<AnyAction>, payload: IEscapedPawn) => {
    dispatch({
        type: addEscapedPawns,
        payload
    })
}

export const removeEscapedPawnsByFromDispatch = (dispatch: Dispatch<AnyAction>, payload: ICoords) => {
    dispatch({
        type: removeEscapedPawnsByFrom,
        payload
    })
}

export const removeEscapedPawnsByToDispatch = (dispatch: Dispatch<AnyAction>, payload: ICoords) => {
    dispatch({
        type: removeEscapedPawnsByTo,
        payload
    })
}

export const setSortDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setSort,
        payload
    })
}

export default reducer;
