import { useState, useEffect } from 'react'

// Function to fetch data from the API and return the data, error, and loading state
const useFetch = url => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url)

        if (!res.ok) {
          setError('Failed to fetch')
        }
        const result = await res.json()
        setData(result.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return {
    data,
    error,
    loading,
  }
}
