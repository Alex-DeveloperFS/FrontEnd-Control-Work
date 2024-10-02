import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = <T>(url: string, limit?: number, brand?: string, selectedCategory?: string, reload?: string) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {

      const cancelToken = axios.CancelToken.source()
      setIsLoading(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 20))
        let queryUrl = url
        const params = new URLSearchParams()

        if (limit) params.append('_limit', `${limit}`)
        if (brand) params.append('brand', `${brand}`)
        if (selectedCategory) params.append('category', `${selectedCategory}`)

        if (params.toString()) queryUrl += `?${params.toString()}`

        const response = await axios.get<T[]>(queryUrl, {
          cancelToken: cancelToken.token,
        })

        if (response?.status !== 200) {
          throw new Error(`Error: Request failed with status code: ${response.status}`)
        }

        setData(response.data)

      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message)
        } else {
          setError(`Error fetching data, ${(err as Error).message}`)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData().catch((err) => console.error('Error fetching data', err.message))
  }, [url, limit, brand, reload])

  return { data, error, isLoading }
}
