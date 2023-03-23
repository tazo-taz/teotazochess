import React, { useContext } from 'react'
import styled from 'styled-components'
import { Flex } from '../../tJS/styledComponents'
import { GrayButton, GreenButton, HomePageButton } from '../Button'
import History from '../History'
import { VscDebugRestart } from "react-icons/vsc";
import { BsArrowRightShort } from "react-icons/bs";
import { ChessContext } from '../../context/chessContext'
import useRedux from '../../utils/redux'
import SidePanelTemplate from './Template'

export const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: ${(p: { padding?: string }) => p.padding || "10px 20px"};
`

interface IProps {
    newGame: Function
}

export default function SidePanelComponent({ newGame }: IProps) {
    const { chess } = useContext(ChessContext)
    const { clear } = chess
    const { history } = useRedux()

    return (
        <SidePanelTemplate gridPanel={true}>
            <History history={history} />
            <ButtonGroup>
                <GreenButton width="100%" onClick={() => {
                    clear()
                }}>
                    <Flex alignitems='center' gap={5}>
                        <VscDebugRestart />
                        Rematch
                    </Flex>
                </GreenButton>
                <GrayButton width="100%" onClick={() => newGame()}>
                    <Flex alignitems='center' gap={5}>
                        <BsArrowRightShort />
                        New game
                    </Flex>
                </GrayButton>
                <HomePageButton width="100%" />
            </ButtonGroup>
        </SidePanelTemplate>
    )
}
