import customHooks from "./customHooks"
import functions from "./functions"
import Modal from "./Modal"
import SimpleModal from "./Modal/SimpleModal"
import components from "./styledComponents"


const tJS = {
    customHooks,
    components: {
        Modal,
        SimpleModal,
        ...components
    },
    functions
}

export default tJS