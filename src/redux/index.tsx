import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameInterface } from "./game";

import gameReducer from "./game"
import modalReducer from "./modal"
import { modalInterface } from "./modal";

export default interface reduxInterface {
    game: gameInterface,
    modal: modalInterface,
}

const reduxReducer = combineReducers({
    game: gameReducer,
    modal: modalReducer,
})

export const store = configureStore({
    reducer: reduxReducer
})