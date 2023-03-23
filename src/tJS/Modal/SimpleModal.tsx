import { mergeClassNames } from "../functions"
import style from "./style.module.css"

export interface simpleModalInterface {
    open: boolean,
    setOpen: Function,
    children?: any,
    containerClass?: string,
    boxClass?: string,
    closeOnClickOutside?: boolean
}

const SimpleModal = ({open, setOpen, children, containerClass = "", boxClass = "", closeOnClickOutside = true}: simpleModalInterface) => {

    const closeModal = () => setOpen(false)
    const stopClosingModal = (e: any) => e.stopPropagation()

    if(!open)return null
    return <div className={style.allContainer}>
    <div className={mergeClassNames(style.container,containerClass)} onClick={() => closeOnClickOutside && closeModal()}>
    </div>
    <div className={mergeClassNames(style.box,boxClass)} onClick={stopClosingModal}>
        {children}
    </div>
    </div>
}

export default SimpleModal