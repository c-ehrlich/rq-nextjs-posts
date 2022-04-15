import React from 'react'

const Post = ({post}: {post: Post}) => {
  return (
    <div>
      <h1>{post.id} - {post.title}</h1>
      <div>{post.text}</div>
      <div>Created: {post.createdAt}</div>
      <div>Updated: {post.updatedAt}</div>
    </div>
  )
}

export default Post