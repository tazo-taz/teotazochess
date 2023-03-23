import React, { useContext } from 'react'
import Board from '../../../components/Board'
import { BlueButton, GreenButton, YellowButton } from '../../../components/Button';
import Checkbox from '../../../components/checkbox';
import History from '../../../components/History';
import SidePanelTemplate from '../../../components/SidePanel/Template';
import { activeBoxType } from '../../../interfaces/game';
import { Div, Flex } from '../../../tJS/styledComponents';
import useChess from '../../../utils/chess';
import { IHistory, IUseChess } from '../../../utils/chess/chess';
import { CreateBoardContext } from '../context'

interface IProps {
    isWhite: boolean;
    toggleIsWhite: (valuee?: any) => void;
    chess: IUseChess;
    goBack: () => any;
    restart: () => any;
    save: () => any;
    activeBox: activeBoxType;
    setActiveBox: React.Dispatch<React.SetStateAction<activeBoxType>>;
    setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
    history: IHistory[]
}

export default function Step2Component({ isWhite, toggleIsWhite, chess, goBack, activeBox, setActiveBox, history, restart, save }: IProps) {
    return (
        <Div display='grid' gridTemplateColumns='1fr auto' gap={20}>
            <Board chess={chess} activeBox={activeBox} setActiveBox={setActiveBox} />
            <SidePanelTemplate>
                <History history={history} />
                <Flex flexDirection='column' p={10} gap={15}>
                    <Checkbox on={isWhite} toggleOn={toggleIsWhite} label="Whould white start playing?" />
                    <Div display='grid' gridTemplateColumns='1fr 1fr' gap={15} flexDirection="column">
                        <BlueButton onClick={restart}>Restart</BlueButton>
                        <GreenButton onClick={goBack}>Go back</GreenButton>
                    </Div>
                    <YellowButton onClick={save}>Save</YellowButton>
                </Flex>
            </SidePanelTemplate>
        </Div>
    )
}
