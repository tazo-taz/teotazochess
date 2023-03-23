import React from 'react'
import { mergeClassNames } from '../functions'
import ModalWithTransition, { IModalWithTransition } from './ModalWithTransition'
import "./style.css"

export default function OpacityModal({ boxClass, containerClass, ...props }: IModalWithTransition) {
  return (
    <ModalWithTransition
      boxClass={mergeClassNames('OpacityModalBoxClass', boxClass)}
      containerClass={mergeClassNames('OpacityModalBoxClass', containerClass)}
      {...props}
    />
  )
}
