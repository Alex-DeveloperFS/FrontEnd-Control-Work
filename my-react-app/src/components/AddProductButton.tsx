import {useState} from "react";
import Modal from "../modals/Modal.tsx";

const AddProductButton = () => {

 const [showModal, setShowModal] = useState(false)

 const handleOpen     = () => setShowModal(true)

 const handleClose = () => setShowModal(false)

  return (
    <>
      <button onClick={handleOpen}>Add Product</button>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2>Add a new product</h2>
          {/* */}
          <button onClick={handleClose}>Close</button>
        </Modal>
      )}
    </>
  )
}

export default AddProductButton