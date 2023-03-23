import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mergeClassNames } from '../tJS/functions'
import { Flex } from '../tJS/styledComponents'
import { AiFillHome } from "react-icons/ai";
import { BsFillPuzzleFill } from "react-icons/bs";
import { IoGameControllerSharp } from 'react-icons/io5'
import { HiStatusOnline } from 'react-icons/hi'

interface IButton {
    mainColor: string,
    secondaryColor: string,
    width?: string
}

const ButtonOutline = styled.button`
    font-size: 17px;
    background: transparent;
    border: 2px solid;
    color: ${(p: IButton) => p.mainColor};
    padding: 5px 9px;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: ${(p: IButton) => p.mainColor};
        color: ${(p: IButton) => p.secondaryColor};
    }
`

const Button = styled.button`
    width: ${(p: IButton) => p.width};
    font-size: 18px;
    background: ${(p: IButton) => p.mainColor};
    border: none;
    color: white;
    padding: 10px 24px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: ${(p: IButton) => p.secondaryColor};
    }
`

export const WhiteButtonOutline = (props: any) => <ButtonOutline mainColor='white' secondaryColor="#637f3d" {...props} />

export const GreenButton = ({ width, ...props }: any) => <Button width={width || "auto"} secondaryColor='#3f5b18' mainColor="#637f3d" {...props} />

export const RedButton = ({ width, ...props }: any) => <Button width={width || "auto"} secondaryColor='#5b1414' mainColor="#8c3d3d" {...props} />

export const GrayButton = ({ width, ...props }: any) => <Button width={width || "auto"} secondaryColor='#2c2c2c' mainColor="#474744" {...props} />

export const BlueButton = ({ width, ...props }: any) => <Button width={width || "auto"} secondaryColor='#214555' mainColor="rgb(61 107 127)" {...props} />

export const YellowButton = ({ width, ...props }: any) => <Button width={width || "auto"} secondaryColor='#645b17' mainColor="#929140" {...props} />

export const GreenButtonIcon = ({ Icon, children, className, ...props }: any) =>
    <GreenButton className={mergeClassNames(className, "center")} {...props}>
        <Flex alignitems='center' gap={5}>
            <Icon />
            {children}
        </Flex>
    </GreenButton>

export const GrayButtonIcon = ({ Icon, children, className, ...props }: any) =>
    <GrayButton className={mergeClassNames(className, "center")} {...props}>
        <Flex alignitems='center' gap={5}>
            <Icon />
            {children}
        </Flex>
    </GrayButton>

export const BlueButtonIcon = ({ Icon, children, className, ...props }: any) =>
    <BlueButton className={mergeClassNames(className, "center")} {...props}>
        <Flex alignitems='center' gap={5}>
            <Icon />
            {children}
        </Flex>
    </BlueButton>

export const GreenLinkButtonIcon = ({ to, ...props }: any) => <Link to={to} className='no-underline'>
    <GreenButtonIcon {...props} />
</Link>

export const GreenLinkButton = ({ to, ...props }: any) => <Link to={to} className='no-underline'>
    <GreenButton {...props} />
</Link>

export const BlueLinkButton = ({ to, ...props }: any) => <Link to={to} className='no-underline'>
    <BlueButton {...props} />
</Link>

export const HomePageButton = (props: any) => <GreenLinkButtonIcon Icon={AiFillHome} to="/" {...props}>
    Home page
</GreenLinkButtonIcon>

export const PuzzlesPageButton = ({ children = "Play puzzles", ...props }: any) => <GreenLinkButtonIcon to="/puzzles" Icon={BsFillPuzzleFill} {...props}>
    {children}
</GreenLinkButtonIcon>

export const PlayGameButton = (props: any) => <GreenLinkButtonIcon to="/game" Icon={IoGameControllerSharp} {...props}>
    Play a game
</GreenLinkButtonIcon>

export const PlayOnlineButton = (props: any) => <GreenLinkButtonIcon to="" width="100%" Icon={HiStatusOnline} {...props}>
    Playing online coming soon
</GreenLinkButtonIcon>

export default ButtonOutline
