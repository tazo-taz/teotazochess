import { forwardRef } from 'react';
import styled, { css } from 'styled-components';


interface IGeneral {
    overflow?: string
    position?: "absolute" | "fixed" | "inherit" | "initial" | "sticky" | "unset" | "revert" | "relative"
    bg?: string,
    width?: string | number,
    height?: string | number,
    minWidth?: string | number,
    minHeight?: string | number,
    borderRadius?: number | string,
    zIndex?: number
    p?: string | number,
    pt?: string | number,
    pr?: string | number,
    pb?: string | number,
    pl?: string | number,
    m?: string | number,
    mt?: string | number,
    mr?: string | number,
    mb?: string | number,
    ml?: string | number,
    gap?: number,
    justifyContent?: string,
    alignitems?: string,
    flexDirection?: string,
    fontSize?: number | string,
    color?: string,
    textAlign?: string,
    fontWeight?: string,
    textDecoration?: string,
    textShadow?: string,
    display?: string,
    cursor?: string,
    border?: string,
    boxShadow?: string,
    top?: string,
    left?: string,
    right?: string,
    bottom?: string,
    transform?: string,
    gridTemplateColumns?: string,
    gridArea?: string,
}

const stringOrNumber = (key: string | number | undefined) => typeof key === "string" ? key : key + "px"

const general = css`
    overflow: ${(e: IGeneral) => e.overflow};
    position: ${(e: IGeneral) => e.position};
    color: ${(e: IGeneral) => e.color};
    background: ${(e: IGeneral) => e.bg};
    z-index: ${(e: IGeneral) => e.zIndex};
    padding: ${({ p }: IGeneral) => stringOrNumber(p)};
    padding-top: ${(e: IGeneral) => e.pt && e.pt + "px"};
    padding-right: ${(e: IGeneral) => e.pr && e.pr + "px"};
    padding-bottom: ${(e: IGeneral) => e.pb && e.pb + "px"};
    padding-left: ${(e: IGeneral) => e.pl && e.pl + "px"};
    width: ${({ width }: IGeneral) => stringOrNumber(width)};
    height: ${({ height }: IGeneral) => stringOrNumber(height)};
    min-width: ${({ minWidth }: IGeneral) => stringOrNumber(minWidth)};
    min-height: ${({ minHeight }: IGeneral) => stringOrNumber(minHeight)};
    border-radius: ${({ borderRadius }: IGeneral) => stringOrNumber(borderRadius)};
    margin: ${(e: IGeneral) => e.m && e.m + "px"};
    margin-top: ${(e: IGeneral) => e.mt && e.mt + "px"};
    margin-right: ${(e: IGeneral) => e.mr && e.mr + "px"};
    margin-bottom: ${(e: IGeneral) => e.mb && e.mb + "px"};
    margin-left: ${(e: IGeneral) => e.ml && e.ml + "px"};
    font-size: ${({ fontSize }: IGeneral) => stringOrNumber(fontSize)};
    text-align: ${(p: IGeneral) => p.textAlign};
    font-weight: ${(p: IGeneral) => p.fontWeight};
    text-decoration: ${(p: IGeneral) => p.textDecoration};
    text-shadow: ${(p: IGeneral) => p.textShadow};
    display: ${(e: IGeneral) => e.display};
    gap: ${(e: IGeneral) => e.gap}px;
    justify-content: ${(e: IGeneral) => e.justifyContent};
    align-items: ${(e: IGeneral) => e.alignitems};
    flex-direction: ${(e: IGeneral) => e.flexDirection};
    cursor: ${(e: IGeneral) => e.cursor};
    border: ${(e: IGeneral) => e.border};
    box-shadow: ${(e: IGeneral) => e.boxShadow};
    top: ${({ top }: IGeneral) => top};
    left: ${({ left }: IGeneral) => left};
    right: ${({ right }: IGeneral) => right};
    bottom: ${({ bottom }: IGeneral) => bottom};
    transform: ${({ transform }: IGeneral) => transform};
    grid-template-columns: ${({ gridTemplateColumns }: IGeneral) => gridTemplateColumns};
    grid-area: ${({ gridArea }: IGeneral) => gridArea};
`


export const Div = styled.div`
    ${general}
`

interface IFlex extends IGeneral, React.ComponentPropsWithoutRef<"div"> {
    ref?: React.MutableRefObject<any>
}

export const Flex = forwardRef((props: IFlex, ref) => <Div ref={ref} display="flex" {...props} />)

const components = {
    Flex,
    Div
}

export default components