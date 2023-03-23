import React from 'react'
import Board from '../../components/Board'
import { BlueLinkButton, GreenLinkButton, HomePageButton, PlayGameButton, PuzzlesPageButton, RedButton } from '../../components/Button'
import History from '../../components/History'
import { ButtonGroup } from '../../components/SidePanel/SidePanel.component'
import { activeBoxType } from '../../interfaces/game'
import { Div, Flex } from '../../tJS/styledComponents'
import { IUseChess } from '../../utils/chess/chess'
import { Container } from '../Game/styled'



export default function PuzzleComponent({
    id,
    chess,
    activeBox,
    setActiveBox,
    isGameOver,
    gameOverMessage,
    tryAgain,
    turn
}: {
    id: number;
    chess: IUseChess;
    activeBox: activeBoxType;
    setActiveBox: React.Dispatch<React.SetStateAction<activeBoxType>>;
    isGameOver: boolean,
    gameOverMessage: boolean,
    tryAgain: Function,
    turn: boolean
}) {
    const BoardProps = {
        chess,
        activeBox,
        setActiveBox,
        moveOnlyWhite: false,
        moveOnlyBlack: false,
    }

    // if (turn) BoardProps.moveOnlyWhite = true
    // if (turn === false) BoardProps.moveOnlyBlack = true

    return (
        <Flex flexDirection='column' gap={20}>
            <Flex justifyContent='space-between' alignitems='center'>
                <Div p={"2px 0"} color='white' fontSize={35}>Puzzle {id}</Div>
                {isGameOver && <>
                    <Div
                        bg={gameOverMessage ? '#3d6b7fa1' : "#7f3d3da1"}
                        fontSize={25}
                        color="white"
                        p="7px 16px"
                        borderRadius={5}
                    >
                        {gameOverMessage ?
                            "You won" :
                            "You lost"
                        }
                    </Div>
                </>}
            </Flex>
            <Container>
                <Board {...BoardProps} />
                <Flex flexDirection='column' gap={20}>
                    <Flex flexDirection='column' gap={15}>
                        <History history={chess.history} />
                        <ButtonGroup padding={"0"}>
                            <HomePageButton width="100%" />
                            <PlayGameButton width="100%" />
                            <PuzzlesPageButton width="100%">Other puzzles</PuzzlesPageButton>
                            {isGameOver && <> {
                                gameOverMessage ?
                                    <BlueLinkButton width="100%" to={"/puzzle/" + (id + 1)}>Next level</BlueLinkButton>
                                    :
                                    <div>
                                        <RedButton width="100%" onClick={() => tryAgain()}>
                                            Try again
                                        </RedButton>
                                    </div>
                            }
                            </>
                            }
                        </ButtonGroup>
                    </Flex>
                </Flex>
            </Container>
        </Flex>
    )
}
