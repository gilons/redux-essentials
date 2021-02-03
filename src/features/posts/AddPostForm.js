import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice';
import { addPost } from './postsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatcher = useDispatch()
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const canSave = [content, userId, title].every(Boolean) && addRequestStatus === 'idle'

  const users = useSelector(selectAllUsers)
  const onSavePostClicked = async () => {

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatcher(addPost({ title, content, user: userId }))
        unwrapResult(resultAction)
        //dispatcher(postAdded(title, content,userId))
        setContent('')
        setUserId('')
        setTitle('')
      } catch (error) {
        console.error("failed to add post: ", error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const onTitleChange = (val) => setTitle(val.target.value)
  const onContentChange = (val) => setContent(val.target.value)
  const onAuthorChange = (val) => setUserId(val.target.value)

  const usersOptions = users.map((user) => {
    return <option key={user.id} value={user.id}>
      {user.name}
    </option>
  })

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
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
