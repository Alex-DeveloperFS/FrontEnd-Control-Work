import {useEffect, useRef, useState} from "react"
import axios from "axios"

export const useFetch = <T>(url: string, limit?: number) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const cancelTokenSource = useRef(axios.CancelToken.source())

  useEffect(() => {
    const currentCancelTokenSource = cancelTokenSource.current

    const fetchData = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))
        // noinspection JSAnnotator
        const response = await axios.get<T>(limit ? `${url}?_limit=${limit}` : url, {
          cancelToken: currentCancelTokenSource.token,
        })

        if (response.status !== 200) {
          throw new Error(`Error: Request failed with status code: ${response.status}`)
        }

        setData(response.data)
      } catch (err) {
        if (axios.isCancel(err)) {
        } else {
          setError(`Error fetching posts', ${(err as Error).message}`)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData().catch(err => console.error('Error fetching data', err.message))
  }, [])
  return {data, error, isLoading}
}