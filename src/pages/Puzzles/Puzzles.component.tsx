import React from 'react'
import { HomePageButton } from '../../components/Button'
import LvlCard from '../../components/LvlCard'
import { Div, Flex } from '../../tJS/styledComponents'
import { puzzleLvls } from '../../utils/constants'
import { Grid } from './styled'


export default function PuzzlesComponent() {
    return (
        <Div className='w-100 h-screen' p={20}>
            <Flex gap={15}>
                <Div color='white' fontSize={30}>Choose puzzle</Div>
                <HomePageButton />
            </Flex>
            <Grid>
                {puzzleLvls.map((a) => <LvlCard id={a.id} />)}
            </Grid>
        </Div>
    )
}
