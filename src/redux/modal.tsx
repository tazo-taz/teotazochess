import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export interface modalInterface {
    isUpgradePawnModalOpen: boolean,
    isGameOverModalOpen: boolean,
}

export const initialState: modalInterface = {
    isUpgradePawnModalOpen: false,
    isGameOverModalOpen: false,
};

const setIsUpgradePawnModalOpen = "setIsUpgradePawnModalOpen"
const setIsGameOverModalOpen = "setIsGameOverModalOpen"


interface reducerObjInt {
    payload?: any,
    type: string
}


const reducer = (state = initialState, { payload, type }: reducerObjInt) => {
    switch (type) {
        case setIsUpgradePawnModalOpen:
            return { ...state, isUpgradePawnModalOpen: payload };
        case setIsGameOverModalOpen:
            return { ...state, isGameOverModalOpen: payload };
        default:
            return state;
    }
};



export const setIsUpgradePawnModalOpenDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsUpgradePawnModalOpen,
        payload
    })
}


export const setIsGameOverModalOpenDispatch = (dispatch: Dispatch<AnyAction>, payload: boolean) => {
    dispatch({
        type: setIsGameOverModalOpen,
        payload
    })
}

export default reducer;
