/* eslint-disable @typescript-eslint/no-var-requires */
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const createComment = (request, response) => {
  const { email, content } = request.body

  pool.query(
    'INSERT INTO comments (email, content) VALUES ($1, $2)',
    [email, content],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        message: 'Comment added',
        data: { email, content },
      })
    }
  )
}

const getComments = (request, response) => {
  const query = `
    SELECT
      c.*,
      replies
    FROM
      "comments" c
      LEFT JOIN (
        SELECT
          parentId,
          COALESCE(json_agg(row_to_json(replies)), '[]'::JSON) AS replies
        FROM
          "comments" AS replies
        GROUP BY
          parentId
      ) AS replies ON c.id = replies.parentId
    WHERE
      c.parentId IS NULL
    ORDER BY
      c.id ASC;
  `;

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({
      message: 'Comments found',
      data: { comments: results.rows },
    })
  })
}

const deleteComment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM comments WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({
      message: `Comment deleted with ID: ${id}`,
      data: { results: results.rowCount },
    })
  })
}

const editComment = (request, response) => {
  const id = parseInt(request.params.id)
  const { content } = request.body

  pool.query(
    'UPDATE comments SET content = $1 WHERE id = $2',
    [content, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send({
        message: `Comment modified with ID: ${id}`,
        data: { results: results.rowCount },
      })
    }
  )
}

const createReply = (request, response) => {
  const { email, content, id } = request.body

  pool.query(
    'INSERT INTO comments (email, content, parentId) VALUES ($1, $2, $3)',
    [email, content, id],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        message: 'Comment added',
        data: { email, content, id },
      })
    }
  )
}

module.exports = {
  createComment,
  getComments,
  deleteComment,
  editComment,
  createReply,
}
