import { useParams } from 'react-router-dom'
import { HomePageButton, PuzzlesPageButton } from '../../components/Button'
import { Div, Flex } from '../../tJS/styledComponents'
import { puzzleLvls } from '../../utils/constants'
import PuzzleContainer from './Puzzle.container'
import { useLocalStorage } from '../../tJS/customHooks'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { useDidMountEffect } from '../../tJS/customHooks'
import useRedux from '../../utils/redux'

export default function Puzzle() {
    let { id } = useParams()
    const { puzzleLvl } = useRedux()

    const [x, setX] = useState(true)

    const DontShow = <Flex flexDirection='column' gap={15} alignitems="center">
        <Div color='white' fontSize={20}>Puzzle could not be found</Div>
        <Flex gap={10}>
            <HomePageButton />
            <PuzzlesPageButton />
        </Flex>
    </Flex>

    useDidMountEffect(() => {
        setX(false)
        setTimeout(() => {
            setX(true)
        }, 400)
    }, [id])

    if (!x) return <div>
        <AiOutlineLoading color='white' fontSize={50} className="spin" />
    </div>

    if (!id || !puzzleLvl) return null
    const newId = +id
    const currentPuzzleLvl = puzzleLvls.find(a => a.id === newId)
    if ((newId > puzzleLvl) || !puzzleLvls.find(a => a.id === newId) || !currentPuzzleLvl?.moves) return DontShow

    return (
        <PuzzleContainer currentPuzzleLvl={currentPuzzleLvl} />
    )
}
