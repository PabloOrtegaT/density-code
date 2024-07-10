export type TypeComments =
  | {
      comments: {
        email: string
        content: string
        id: number
        replies: {
          id: number
          email: string
          content: string
        }[]
      }[]
    }
  | undefined

// export type PostUserResponse = {
//   message: string
//   data: TypePostUser
// }
