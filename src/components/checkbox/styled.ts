import styled from "styled-components";

interface IIndentificator {
    maxLeft: number,
    isLeft: boolean,
    maxLeftIsComplete: boolean,
}

export const Indentificator = styled.div`
    position: absolute;
    height: 100%;
    width: 45%;
    background: #434342;
    transition: ${({ maxLeftIsComplete }: IIndentificator) => maxLeftIsComplete && "0.05s"};
    ${({ isLeft, maxLeft }: IIndentificator) => isLeft ? "left: " + maxLeft + "px" : "left: 0"};
    top: 0;
    border-radius: 5px;
`