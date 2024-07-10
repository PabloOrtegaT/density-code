import { TypeComments } from '../../types/comments'
import fetch from 'cross-fetch';

type TPostResponse = {
  message: string
  data: {
    email: string
    content: string
  }
}

export const getComments = async (): Promise<
  [Error | undefined, TypeComments]
> => {
  try {
    const response = await fetch('http://localhost:3000/comments')

    if (!response.ok) throw new Error('Network response was not ok')

    const json = await response.json()

    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) return [error, undefined]
  }

  return [new Error('Unknown error'), undefined]
}

export const postComment = async (data: {
  email: string
  content: string
}): Promise<[Error?, TPostResponse?]> => {
  try {
    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const json = await response.json()

    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknown error')]
}

export const postReply = async (data: {
  email: string
  content: string
  id: number
}): Promise<[Error?, TPostResponse?]> => {
  try {
    const response = await fetch('http://localhost:3000/comments/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const json = await response.json()

    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknown error')]
}

export const editComment = async (data: {
  id: number
  content: string
}): Promise<[Error?, TPostResponse?]> => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const json = await response.json()

    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknown error')]
}

// TODO: This is not returning a full list of remaining comments
export const deleteComment = async (
  id: number
): Promise<[Error | undefined, TypeComments]> => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Network response was not ok')

    const json = await response.json()

    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) return [error, undefined]
  }

  return [new Error('Unknown error'), undefined]
}
