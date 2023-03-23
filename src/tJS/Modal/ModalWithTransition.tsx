import React, { useState, useEffect } from 'react'
import { mergeClassNames } from '../functions'
import SimpleModal, { simpleModalInterface } from './SimpleModal'

export interface IModalWithTransition extends simpleModalInterface {
    delay?: number
}

export default function ModalWithTransition({ open, setOpen, children, boxClass = "", containerClass = "", delay = 300, ...props }: IModalWithTransition) {
    const [state, setState] = useState(open)

    useEffect(() => {
        setTimeout(() => {
            setState(open)
        })
    }, [open])

    const close = (value = false) => {
        setState(value)
        setTimeout(() => {
            setOpen(value)
        }, delay)
    }

    return (
        <SimpleModal boxClass={mergeClassNames(boxClass, (state) && "active")} containerClass={mergeClassNames(containerClass, (state) && "active")} open={open || state} setOpen={close} {...props}>
            {children(close)}
        </SimpleModal>
    )
}
