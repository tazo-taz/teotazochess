import React from 'react'
import { Div, Flex } from '../../tJS/styledComponents'
import CreatingGame from '../../components/CreatingGame'
import GameOver from '../../components/modals/GameOver'
import UpgradePawn from '../../components/modals/UpgradePawn'
import PlayerDisplay from '../../components/PlayerDisplay'
import Playing from '../../components/Playing'
import SidePanel from '../../components/SidePanel'
import { Container } from './styled'

interface IProps {
    isCreatingNewGame: boolean
}

export default function GameComponent({ isCreatingNewGame }: IProps) {
    return (
        <>
            {/* <UpgradePawn /> */}
            <GameOver />
            {!isCreatingNewGame ? <Container>
                <PlayerDisplay area={1} />
                <Playing />
                <PlayerDisplay area={2} />
                <SidePanel />
                <Div gridArea="empty" />
            </Container> : <CreatingGame />
            }
        </>
    )
}
