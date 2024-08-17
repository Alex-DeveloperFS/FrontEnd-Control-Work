import {ReactNode, MouseEvent} from "react"
import {createPortal} from "react-dom"

interface ModalPropsInterface {
  children: ReactNode,
  onClose: () => void
}

const modalRoot = document.getElementById('modal-root')

const Modal = ({children, onClose}: ModalPropsInterface) => {
  if (!modalRoot) return null

  const handleContentClick = (e: MouseEvent) => e.stopPropagation()

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={handleContentClick}>
        <span className="modal__close" onClick={onClose}>
          x
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  )
}
export default Modal