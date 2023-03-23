import React, { useState } from 'react'
import { generateEmptyArr } from '../../utils/box'
import { CreateBoardContext } from './context'
import Step1 from './Step1'
import Step2 from './Step2'


export default function CreateBoard() {
    const [step, setStep] = useState(1)
    const [board, setBoard] = useState(generateEmptyArr())

    let children = null

    if (step === 1) children = <Step1 />
    if (step === 2) children = <Step2 />



    return <CreateBoardContext.Provider value={{
        setStep,
        board,
        setBoard
    }}>
        {children}
    </CreateBoardContext.Provider>
}
