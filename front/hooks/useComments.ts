import { useState } from 'react'
import { getComments } from '../services/comments/comments'
import { TypeComments } from '../types/comments'


export const useGetComments = () => {
  const [newComments, setNewComments] = useState<TypeComments>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getNewComments = async () => {
    setIsLoading(true)
    const [err, data] = await getComments()
    if (err) {
      setError(err.message || 'Error fetching data')
    } else if (!data) {
      setError('No data found')
    } else {
      setNewComments(data)
    }

    setIsLoading(false)
  }

  return { newComments, getNewComments, error, isLoading }
}
