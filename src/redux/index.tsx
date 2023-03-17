import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameInterface } from "./game";

import gameReducer from "./game"

export default interface reduxInterface {
    game: gameInterface,
}

const reduxReducer = combineReducers({
    game: gameReducer
})

export const store = configureStore({
    reducer: reduxReducer
})