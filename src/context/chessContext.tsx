import { createContext } from "react";
import { activeBoxType } from "../interfaces/game";
import { IUseChess, useChessDefaultReturn } from "../utils/chess/chess";

interface IChessContext {
    chess: IUseChess;
    toUpgradedPawnCoords: React.MutableRefObject<activeBoxType>;
    wSeconds: number;
    wResume: () => void;
    wStop: () => void;
    wReset: () => void;
    bSeconds: number;
    bResume: () => void;
    bStop: () => void;
    bReset: () => void;
}

export const ChessContext = createContext<IChessContext>({
    toUpgradedPawnCoords: { current: null },
    chess: useChessDefaultReturn,
    wSeconds: 0,
    wResume: () => { },
    wStop: () => { },
    wReset: () => { },
    bSeconds: 0,
    bResume: () => { },
    bStop: () => { },
    bReset: () => { },
})