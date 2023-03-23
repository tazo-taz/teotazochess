import React, { useEffect, useRef, useState } from 'react'
import { useBoolean } from '../../tJS/customHooks'
import { Flex, Div } from '../../tJS/styledComponents'
import { Indentificator } from './styled'

interface IProps {
    label?: string,
    on: boolean,
    toggleOn: Function,
    horizontal?: boolean,
    gap?: number,
}

export default function Checkbox({ on, toggleOn, label, horizontal = false, gap = 5, ...props }: IProps) {
    const ref = useRef<any>()
    const [maxLeft, setMaxLeft] = useState(0)
    const [maxLeftIsComplete, setMaxLeftIsComplete] = useBoolean()
    useEffect(() => {
        const maxLeft = ref?.current?.offsetWidth * 0.55
        maxLeft && setMaxLeft(maxLeft)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            maxLeft && setMaxLeftIsComplete(true)
        }, 1)
    }, [maxLeft, setMaxLeftIsComplete])

    const ParentFlexProps: any = {
        width: "100%",
    }

    if (horizontal) {
        ParentFlexProps.justifyContent = "space-between"
        ParentFlexProps.flexDirection = "row"
        ParentFlexProps.gap = 15
    } else {
        ParentFlexProps.flexDirection = "column"
        ParentFlexProps.gap = 5
    }
    // ParentFlexProps.alignItems = "baseline"    

    return (
        <Flex {...ParentFlexProps} alignitems={horizontal && "center"} >
            {label && <Div minWidth="max-content" color='white' fontSize={18}>{label}</Div>}
            <Flex
                cursor="pointer"
                overflow="hidden"
                borderRadius={9}
                position="relative"
                height={54}
                width="100%"
                bg="#5C5C5C"
                color='white'
                justifyContent='space-evenly'
                alignitems='center'
                onClick={() => toggleOn(!on)}
                border="2px solid black"
                boxShadow='var(--boxShadow)'
                ref={ref}
            >
                <Div zIndex={2} fontSize={26}>Off</Div>
                <div></div>
                <div></div>
                <Div zIndex={2} fontSize={26}>On</Div>
                <Indentificator maxLeft={maxLeft} maxLeftIsComplete={maxLeftIsComplete} isLeft={on} />
            </Flex>
        </Flex>
    )
}
