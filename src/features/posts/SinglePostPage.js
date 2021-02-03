
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { PostAuthor } from "./PostAuthor"
import { ReactionButton } from "./ReactionsButton";
import { TimeAgo } from './TimeAgo';
import { selectPostById } from './postsSlice';

export const SinglePostPage = ({ match }) => {

    const { postId } = match.params

    const post = useSelector((state) => selectPostById(state,postId))
    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }

    return (
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <PostAuthor userId={post.user} />
                <TimeAgo timestap={post.date}/>
                <ReactionButton post={post}/>
                <Link to={'/editPost/' + post.id}>Edit Post</Link>
            </article>
        </section>
    )
}