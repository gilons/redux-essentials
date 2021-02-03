import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost, selectPostById, selectPostIds } from './postsSlice';
import { PostExcerpt as Post } from './PostExcerpt';


let PostExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    return <Post post={post} />
}
export const PostList = () => {

    const dispatch = useDispatch()
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPost())
        }
    }, [postStatus, dispatch])

    const orderedPosts = useSelector(selectPostIds)
    
    let content
    if (postStatus === 'loading') {
        content = <div className={'loader'}>Loading...</div>
    } else if (postStatus === 'succeeded') {
        content = orderedPosts.map((postId) => <PostExcerpt key={postId} postId={postId} />)
    } else {
        content = <div>{error}</div>
    }

    return (
        <section className={'posts-list'}>
            <h2>{'Posts'}</h2>
            {content}
        </section>
    )
}
