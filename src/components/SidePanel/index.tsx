import React from 'react'
import useRedux from '../../utils/redux'
import SidePanelComponent from './SidePanel.component'

export default function SidePanel() {
    const { setIsCreatingNewGame } = useRedux()
    const newGame = () => {
        setIsCreatingNewGame(true)
    }

    const SidePanelComponentProps = {
        newGame
    }

    return (
        <SidePanelComponent {...SidePanelComponentProps} />
    )
}
