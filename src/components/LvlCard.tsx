import React from 'react'
import styled from 'styled-components'
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { GrayButton, GreenLinkButtonIcon } from './Button';
import useRedux from '../utils/redux';
import { useLocalStorage } from '../tJS/customHooks';

const Container = styled.div`
    background: rgb(45 45 45);
    box-shadow: #0000001a 4px 4px 5px;
    padding: 67px 15px;
    padding-bottom: 50px;
    color: white;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    
    & > .header {
        font-size: 23px;
        text-align: center;
    }

    & > img {
        position: absolute;
        width: 40%;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    & .lvlBtn {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 30%);
    }
`

interface IProps {
    id: number
}

export default function LvlCard({ id }: IProps) {
    const { puzzleLvl } = useRedux()

    if (!puzzleLvl) return null
    const puzzleLvlNum = +puzzleLvl
    const isUnlocked = id <= puzzleLvlNum

    return (
        <Container>
            <div className='header'>Puzzle {id}</div>
            <img src='https://icon-library.com/images/knight-chess-icon/knight-chess-icon-2.jpg' alt='' />
            {isUnlocked ?
                <BsFillUnlockFill fontSize={70} />
                :
                <BsFillLockFill fontSize={70} />
            }
            {isUnlocked ?
                <GreenLinkButtonIcon to={"/puzzle/" + id} className="lvlBtn" Icon={AiOutlineRight}>Open</GreenLinkButtonIcon>
                :
                <GrayButton className="lvlBtn not-allowed">Closed</GrayButton>
            }
        </Container>
    )
}
