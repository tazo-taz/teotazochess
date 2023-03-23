import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    gap: 10px;
    column-gap: 20px;
    grid-template-areas: 
        "player1 panel"
        "display panel"
        "player2 empty"
        ;
`