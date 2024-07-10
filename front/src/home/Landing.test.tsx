import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Landing from './Landing'

describe('App', () => {
  test('renders the form inputs', async () => {
    await act(async () => render(<Landing />))
    const emailInput = screen.getByPlaceholderText('Email')
    const commentInput = screen.getByPlaceholderText('Comment')
    const postButton = screen.getByText('Post')

    expect(emailInput).toBeInTheDocument()
    expect(commentInput).toBeInTheDocument()
    expect(postButton).toBeInTheDocument()
  })

  test('handles post submission', async () => {
    await act(async () => render(<Landing />))
    const emailInput = screen.getByPlaceholderText('Email')
    const commentInput = screen.getByPlaceholderText('Comment')
    const postButton = screen.getByText('Post')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(commentInput, { target: { value: 'Test comment' } })
    fireEvent.click(postButton)

    await waitFor(() => {
      const successMessage = screen.getByText('Comment posted')
      expect(successMessage).toBeInTheDocument()
    })
  })

})
