import { mergeClassNames } from "../functions"
import { Flex } from "../styledComponents"
import SimpleModal, { simpleModalInterface } from "./SimpleModal"
import style from "./style.module.css"


interface main extends simpleModalInterface {
    title?: any,
    body?: any,
    btn?: btnInterface,
    btnClass?: string,
    closeBtnClass?: string
    btnGroupClass?: string
}

export interface btnInterface {
    label: string,
    className?: string,
    onClick?: any
}
const Modal = ({title, body, btn,  setOpen, btnClass, closeBtnClass, btnGroupClass, ...rest}: main) => {

    let label, className, onClick
    if(btn){
        label = btn.label
        className = btn.className
        onClick = btn.onClick
    }
    if(!onClick)onClick = () => {}
    const closeModal = () => setOpen(false)

    return <SimpleModal setOpen={setOpen} {...rest}>
        {title && <h3 className={style.title}>{title}</h3>}
        {body && <p className={style.body}>{body}</p>}
        <Flex gap={2} className={mergeClassNames(style.btnsGroup, btnGroupClass)} justifyContent="end">
            <button onClick={closeModal} className={mergeClassNames(style.closeBtn, style.btn, closeBtnClass)}>CLOSE</button>
            {label && <button onClick={onClick} className={mergeClassNames(className, style.btn)}>{label}</button>}
        </Flex>
    </SimpleModal>
}

export default Modal