import { activeBoxType } from '../../interfaces/game';
import { IHistory, IUseChess } from '../../utils/chess/chess';
import Board from '../Board';
import { Container } from './styled';

interface IProps {
    activeBox: activeBoxType;
    setActiveBox: React.Dispatch<React.SetStateAction<activeBoxType>>;
    toUpgradedPawnCoords: React.MutableRefObject<activeBoxType>;
    setHistory: (payload: IHistory[]) => void;
    chess: IUseChess,
    onGameOver: Function
}

export default function PlayingComponent({ chess, ...props }: IProps) {
    return (
        <Container>
            <Board
                chess={chess}
                {...props}
            />
        </Container>
    )
}
