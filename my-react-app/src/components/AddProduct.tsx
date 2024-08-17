import {useState} from "react";
import Modal from "../modals/Modal.tsx";
import ProductForm from "./form/ProductForm.tsx";
import {ProductInterface} from "../types/Product.Interface.ts";
import {useAdd} from "../hooks/useAdd.ts";
import {API_URL} from "../utils/mockApi.ts";
import {INITIAL_PRODUCT} from "../data/mockData.ts";

const AddProduct = () => {

  const [showModal, setShowModal] = useState(false)
  const {add, error} = useAdd(API_URL)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleSubmit = async (product: Partial<ProductInterface>) => {
    try {
      const newProduct = await add(product)
      console.log(newProduct)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button className="add-product-btn" onClick={handleOpen}>Add Product</button>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className="modal__title">Add a new product</h2>
          {error && <p className="error">{error}</p>}
          <ProductForm onSubmit={handleSubmit} product={INITIAL_PRODUCT}/>
        </Modal>
      )}
    </>
  )
}

export default AddProduct