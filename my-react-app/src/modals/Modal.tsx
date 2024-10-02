import {ReactNode, MouseEvent} from "react"
import {createPortal} from "react-dom"
import styles from "./Modal.module.scss"
import formStyles from "../components/form/Form.module.scss"

interface ModalPropsInterface {
  children: ReactNode
  onClose: () => void
  className?: string
}

const modalRoot = document.getElementById('modal-root')

const Modal = ({children, onClose, className}: ModalPropsInterface) => {
  if (!modalRoot) return null

  const handleContentClick = (e: MouseEvent) => e.stopPropagation()

  return createPortal(

    <div className={`${styles.modal__overlay} ${className}`} onClick={onClose}>

      <div className={`${styles.modal} ${className}`} onClick={handleContentClick}>
        <button className={formStyles.buy_form_close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal
