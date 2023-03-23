import React from 'react'
import { IModalWithTransition } from '../../tJS/Modal/ModalWithTransition'
import OpacityModal from '../../tJS/Modal/OpacityModal'

import "./style.css"

export default function MyModal(props: IModalWithTransition) {
  return (
    <OpacityModal boxClass='mymodalboxclass' {...props} />
  )
}
