import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice';

export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state,postId))

  const [title, setTitle] = useState(post.title || '')
  const [content, setContent] = useState(post.content || '')

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChange = (event) => setTitle(event.target.value)
  const onContentChange = (event) => setContent(event.target.value)

  const onSavePostClicked = () => {
    if (content && title) {
      dispatch(postUpdated({ content, title, id: postId }))
      history.push('posts/' + postId)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle"> Post Title</label>
        <input
          name="postTitle"
          type="text"
          id="postTitle"
          placeholder="What's on your mind"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
