import { Toaster, toast } from 'sonner'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useGetComments } from '../../hooks/useComments'
import {
  deleteComment,
  editComment,
  postComment,
  postReply,
} from '../../services/comments/comments'

const Landing = () => {
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [idEditing, setIdEditing] = useState<number | null>(null)
  const [commentEditing, setCommentEditing] = useState('')
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyEmail, setReplyEmail] = useState('')
  const [replyComment, setReplyComment] = useState('')

  const { newComments, getNewComments, isLoading } = useGetComments()

  useEffect(() => {
    getNewComments()
  }, [])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const [err, data] = await postComment({
      email,
      content: comment,
    })
    if (err) {
      toast.error(err.message || 'Error posting comment')
      return
    } else if (!data) {
      toast.error('No data found')
      return
    } else {
      getNewComments()
      toast.success('Comment posted')
    }
  }

  const handleSubmitReply = async (id: number) => {
    const [err, data] = await postReply({
      email: replyEmail,
      content: replyComment,
      id,
    })
    if (err) {
      toast.error(err.message || 'Error posting comment')
      return
    } else if (!data) {
      toast.error('No data found')
      return
    } else {
      getNewComments()
      toast.success('Comment posted')
    }
    setReplyingTo(null)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setReplyEmail('')
    setReplyComment('')
  }

  const handleCancelEdit = () => {
    setIdEditing(null)
    setComment('')
  }

  const handleEdit = async (index: number, content: string) => {
    setIdEditing(index)
    setCommentEditing(content)
  }

  const handleConfirmEdit = async () => {
    const [err, data] = await editComment({
      id: idEditing!,
      content: commentEditing,
    })
    if (err) {
      toast.error(err.message || 'Error editing comment')
      return
    } else if (!data) {
      toast.error('No data found')
      return
    } else {
      getNewComments()
      toast.success('Comment edited')
    }
    setIdEditing(null)
  }

  const handleDelete = async (id: number) => {
    const [err, data] = await deleteComment(id)
    if (err) {
      toast.error(err.message || 'Error deleting comment')
      return
    } else if (!data) {
      toast.error('No data found')
      return
    } else {
      getNewComments()
      toast.success('Comment deleted')
    }
  }

  const handleReply = (id: number) => {
    setReplyingTo(id)
  }

  return (
    <div>
      <Toaster />
      <form action="" onSubmit={handleSubmit}>
        <input
          className="email-input"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          className="comment-input"
          type="text"
          value={comment}
          placeholder="Comment"
          onChange={(e) => {
            setComment(e.target.value)
          }}
        />
        <button type="submit">Post</button>
      </form>
      {isLoading
        ? 'Loading...'
        : newComments?.comments.map((comment) => (
            <div key={comment.id}>
              <div className="base-comment">
                <h4>Posted by: {comment.email}</h4>
                {comment.id === idEditing ? (
                  <div>
                    <input
                      className="comment-item"
                      type="text"
                      value={commentEditing}
                      onChange={(e) => {
                        setCommentEditing(e.target.value)
                      }}
                    />
                    <button onClick={handleCancelEdit}>Cancel</button>
                    <button onClick={handleConfirmEdit}>Confirm</button>
                  </div>
                ) : (
                  <p>{comment.content}</p>
                )}
                <button onClick={() => handleEdit(comment.id, comment.content)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
                <button onClick={() => handleReply(comment.id)}>Reply</button>
                {replyingTo === comment.id && (
                  <div>
                    <input
                      className="email-input"
                      type="text"
                      value={replyEmail}
                      placeholder="Email-reply"
                      onChange={(e) => {
                        setReplyEmail(e.target.value)
                      }}
                    />
                    <input
                      className="comment-input"
                      type="text"
                      value={replyComment}
                      placeholder="Comment-reply"
                      onChange={(e) => {
                        setReplyComment(e.target.value)
                      }}
                    />
                    <button onClick={handleCancelReply}>Cancel</button>
                    <button onClick={() => handleSubmitReply(comment.id)}>
                      Post Reply
                    </button>
                  </div>
                )}
              </div>
              <div>
                {comment.replies && comment.replies.length > 0 ? (
                  comment.replies.map((reply) => (
                    <div className="reply-comment" key={reply.id}>
                      <div>
                        <h5>Replied by: {reply.email}</h5>
                        {reply.id === idEditing ? (
                          <div>
                            <input
                              className="comment-item"
                              type="text"
                              value={commentEditing}
                              onChange={(e) => {
                                setCommentEditing(e.target.value)
                              }}
                            />
                            <button onClick={handleCancelEdit}>Cancel</button>
                            <button onClick={handleConfirmEdit}>Confirm</button>
                          </div>
                        ) : (
                          <p>{reply.content}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleEdit(reply.id, reply.content)}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(reply.id)}>
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
    </div>
  )
}

export default Landing
