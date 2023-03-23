import { createContext } from "react";
import { activeBoxType } from "../../interfaces/game";


interface IBoardContext {
    isUpgradePawnModalOpen: boolean,
    setIsUpgradePawnModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    upgradedPawn: string | null,
    setUpgradedPawn: React.Dispatch<React.SetStateAction<string | null>>,
    upgradedPawnColor: string | null,
    setUpgradedPawnColor: React.Dispatch<React.SetStateAction<string | null>>,
    toUpgradedPawnCoords: React.MutableRefObject<activeBoxType | undefined>
}

export const BoardContext = createContext<IBoardContext>({
    isUpgradePawnModalOpen: false,
    setIsUpgradePawnModalOpen: () => { },
    upgradedPawn: null,
    setUpgradedPawn: () => { },
    upgradedPawnColor: null,
    setUpgradedPawnColor: () => { },
    toUpgradedPawnCoords: { current: undefined }
})