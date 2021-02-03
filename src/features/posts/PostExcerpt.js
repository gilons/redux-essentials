import React from 'react'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionsButton'
import { Link } from 'react-router-dom'

 const Post = ({ post }) => {
  return (
    <article className={'post-excerpt'} key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <TimeAgo timestap={post.date} />
      <ReactionButton post={post} />
      <Link to={'/posts/' + post.id} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostExcerpt = React.memo(Post)
