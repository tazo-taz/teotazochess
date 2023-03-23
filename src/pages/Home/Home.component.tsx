import React from 'react'
import { PlayGameButton, PlayOnlineButton, PuzzlesPageButton } from '../../components/Button'
import { DefaultContainer } from '../../components/styled'
import { Div, Flex } from '../../tJS/styledComponents'
import { MainImg } from './styled'

export default function HomeComponent() {
    return (
        <DefaultContainer>
            <Flex flexDirection='column' gap={15} position="relative" p={20} pt={80}>
                <MainImg src='https://cdn-icons-png.flaticon.com/512/2500/2500116.png' />
                <Div color='white' textAlign='center' fontSize={30}>Home page</Div>
                <PlayGameButton width="100%" />
                <PuzzlesPageButton width="100%" />
                <PlayOnlineButton />
            </Flex>
        </DefaultContainer>
    )
}
