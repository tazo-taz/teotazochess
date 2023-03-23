import { createContext } from "react";
import { generateEmptyArr } from "../../utils/box";


interface ICreateBoardContext {
    setStep: Function,
    board: string[][],
    setBoard: Function
}

export const CreateBoardContext = createContext<ICreateBoardContext>({
    setStep: () => { },
    board: generateEmptyArr(),
    setBoard: () => { }
})