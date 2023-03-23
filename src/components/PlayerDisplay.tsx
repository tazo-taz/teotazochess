import React, { useContext } from 'react'
import styled from 'styled-components'
import { ChessContext } from '../context/chessContext'
import { parseSeconds } from '../tJS/functions'
import { Div } from '../tJS/styledComponents'
import { maxTimeValue } from '../utils/box'
import useRedux from '../utils/redux'

interface IProps {
    area: number
}

interface IContainer {
    area: number
}

const Container = styled.div`
    grid-area: player${(p: IContainer) => p.area};
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default function PlayerDisplay({ area }: IProps) {
    const { wSeconds, bSeconds } = useContext(ChessContext)
    const { maxTime } = useRedux()
    const maxTimeVal = maxTimeValue(maxTime)
    return (
        <Container area={area}>
            <Div color='white' fontSize={25}>Player {area}</Div>
            {maxTimeVal &&
                <Div bg="#4e4e4e" p="6px 6px 6px 40px" fontSize={20} color="white" borderRadius={5}>{parseSeconds(area === 2 ? wSeconds : bSeconds)}</Div>
            }
        </Container>
    )
}
