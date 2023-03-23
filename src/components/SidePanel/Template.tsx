import React from 'react'
import styled from 'styled-components'

interface IContainer {
    gridPanel?: boolean
}

const Container = styled.div`
    --bg: #262624;
    width: 390px;
    height: 100%;
    min-height: 100%;
    background: var(--bg);
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr auto;
    ${(p: IContainer) => p.gridPanel && 'grid-area: panel;'}
`

export default function SidePanelTemplate(props: any) {
    return (
        <Container {...props} />
    )
}
