import styled from "styled-components";

export const Container = styled.div`
    padding: 15px;
    border-radius: 5px;
    background: #262624;
`

interface IColors {
    active: boolean
}

export const Colors = styled.div`
    width: 150px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    border: 3px solid ${(p: IColors) => p.active ? "rgb(99 127 61)" : "transparent"};
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`

interface ISingleColor {
    color: string
}

export const AllColors = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 150px);
`

export const SingleColor = styled.div`
    width: 100%;
    aspect-ratio: 1;
    background: ${(p: ISingleColor) => p.color}
`