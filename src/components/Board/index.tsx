import { useRef, useState } from 'react'
import { activeBoxType } from '../../interfaces/game'
import BoardContainer, { IBoardContainer } from './Borad.container.tsx'
import { BoardContext } from './context'

export default function Board(props: IBoardContainer) {
    const [isUpgradePawnModalOpen, setIsUpgradePawnModalOpen] = useState(false)
    const [upgradedPawn, setUpgradedPawn] = useState<string | null>(null)
    const [upgradedPawnColor, setUpgradedPawnColor] = useState<string | null>(null)
    const toUpgradedPawnCoords = useRef<activeBoxType>()

    return (
        <BoardContext.Provider value={{
            isUpgradePawnModalOpen,
            setIsUpgradePawnModalOpen,
            upgradedPawn,
            setUpgradedPawn,
            upgradedPawnColor,
            setUpgradedPawnColor,
            toUpgradedPawnCoords,
        }}>
            <BoardContainer {...props} />
        </BoardContext.Provider>
    )
}