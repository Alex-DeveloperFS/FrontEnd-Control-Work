import { useState } from 'react'
import axios from 'axios'
import { ProductInterface } from '../types/Product.interface.ts'

export const useUpdate = (url: string) => {

  const [error, setError] = useState<string | null>(null)
  const update = async (product: ProductInterface) => {

    try {
      const response = await axios.put(`${url}/${product.id}`, product)
      return response.data

    } catch (error) {
      setError(`Error updating product: ${(error as Error).message}`)
    }
  }
  return { update, error }
}