import React from 'react'
import { BlueButtonIcon, GreenButtonIcon, GreenLinkButton, GreenLinkButtonIcon, HomePageButton } from '../Button'
import { RxTimer } from "react-icons/rx";
import { Div, Flex } from '../../tJS/styledComponents';
import { AllColors, Colors, SingleColor } from './styled';
import { MdNavigateNext } from "react-icons/md";
import { colors, piecesArr, timesValues } from '../../utils/constants';
import { RenderPieceElement } from '../RenderPieceElement';
import Board from '../Board';
import { DefaultContainer } from '../styled';

interface IProps {
    maxTime: number | null;
    setMaxTime: (payload: number | null) => void;
    activeColor: number;
    setActiveColor: (payload: number) => void;
    pieces: number
    setPieces: (i: number) => void,
    startPlaying: () => void
}

export default function CreatingGameComponent({ maxTime, setMaxTime, activeColor, setActiveColor, pieces, setPieces, startPlaying }: IProps) {
    return (
        <DefaultContainer>
            <Flex flexDirection='column' gap={30}>
                <Div color='white' fontSize={35} textAlign="center">Create a new game</Div>
                <Flex flexDirection='column' gap={10}>
                    <Div color='white' fontSize={20}>Choose duration</Div>
                    <Div display='grid' gridTemplateColumns='repeat(4, 1fr)' gap={10}>
                        {timesValues.map(({ id, value }, b) =>
                            <GreenButtonIcon width="150px" onClick={() => setMaxTime(id)} className={id === maxTime && "darkgreen"} key={b} Icon={RxTimer}>{value ? value + "min" : "Unlimited"}</GreenButtonIcon>
                        )}
                    </Div>
                </Flex>
                <Flex flexDirection='column' gap={10}>
                    <Div color='white' fontSize={20}>Choose colors</Div>
                    <AllColors>
                        {colors.map(({ colors: [first, second], id }, b) => <Colors key={id} active={id === activeColor} onClick={() => setActiveColor(id)}>
                            <SingleColor color={first} />
                            <SingleColor color={second} />
                        </Colors>
                        )}
                    </AllColors>
                </Flex>
                <Flex flexDirection='column' gap={10}>
                    <Div color='white' fontSize={20}>Choose pieces</Div>
                    <AllColors>
                        {piecesArr.map(({ pieces: [first, second], id }, b) => <Colors key={id} active={id === pieces} onClick={() => setPieces(id)}>
                            <RenderPieceElement className='w-100 aspect-ratio' boxValue={first} withType={true} />
                            <RenderPieceElement className='w-100 aspect-ratio' boxValue={second} withType={true} />
                        </Colors>
                        )}
                    </AllColors>
                </Flex>
                <Flex alignitems='center' justifyContent='center'>
                    <Board size={40} />
                </Flex>
                <Flex justifyContent='center' gap={15}>
                    <HomePageButton />
                    <BlueButtonIcon Icon={MdNavigateNext} onClick={() => startPlaying()}>Start playing</BlueButtonIcon>
                </Flex>
            </Flex>
        </DefaultContainer>
    )
}
