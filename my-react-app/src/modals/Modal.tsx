import {ReactNode, MouseEvent} from "react"
import {createPortal} from "react-dom"
import styles from "./Modal.module.scss"
import formStyles from "../components/form/Form.module.scss"

interface ModalPropsInterface {
  children: ReactNode,
  onClose: () => void
}

const modalRoot = document.getElementById('modal-root')

const Modal = ({children, onClose}: ModalPropsInterface) => {
  if (!modalRoot) return null

  const handleContentClick = (e: MouseEvent) => e.stopPropagation()

  return createPortal(
    <div className={styles.modal__overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleContentClick}>
        <button className={formStyles.buy_form_close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    modalRoot
  )
}

export default Modal