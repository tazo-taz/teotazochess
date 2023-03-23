import { Div, Flex } from '../../tJS/styledComponents'
import { bishop, knight, piecesValues, queen, rook } from '../../utils/constants'
import useRedux from '../../utils/redux'
import { RenderPieceElement } from '../RenderPieceElement'
import MyModal from './MyModal'

export default function UpgradePawn(props: any) {
    const { isUpgradePawnModalOpen, setIsUpgradePawnModalOpen, setUpgradedPawn, upgradedPawnColor, pieces } = useRedux()

    const piecesArr = [rook, knight, bishop, queen]

    return (
        <MyModal
            open={isUpgradePawnModalOpen}
            setOpen={setIsUpgradePawnModalOpen}
            // closeOnClickOutside={false}
            {...props}
        >
            {(close: Function) => <Flex flexDirection='column' gap={10}>
                <Div textAlign='center' color='white' fontSize={30}>Choose piece</Div>
                <Div display='grid' gridTemplateColumns="repeat(4, 1fr)" gap={10}>
                    {piecesArr.map(piece => <div onClick={() => {
                        setUpgradedPawn(piece)
                        close()

                    }}>
                        <RenderPieceElement className='toUpgradePieces' boxValue={`${upgradedPawnColor}-${piece}`} />
                    </div>)}
                </Div>
            </Flex>}
        </MyModal>
    )
}
