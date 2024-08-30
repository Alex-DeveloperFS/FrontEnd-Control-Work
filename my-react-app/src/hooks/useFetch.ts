import {useEffect, useState} from "react"
import axios from "axios"

export const useFetch = <T>(url: string, limit?: number, reload?: string) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {

    const fetchData = async () => {
      const canselToken = axios.CancelToken.source()
      setIsLoading(true)
      console.log(url)
      try {
        await new Promise((resolve) => setTimeout(resolve, 20))
        const [response] = await Promise.all([axios.get<T>(limit ? `${url}?_limit=${limit}` : url, {
          cancelToken: canselToken.token,
        })])

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
  }, [url, limit, reload])
  return {data, error, isLoading}
}




