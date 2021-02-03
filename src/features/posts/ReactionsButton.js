import React from "react"
import { useDispatch } from 'react-redux';
import { reactionAdded } from "./postsSlice";

const reactions = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}
export const ReactionButton = ({post}) => {
    const dispatch = useDispatch()
    const reactionButtons = Object.entries(reactions).map(([name,emoji]) => {
        const react = () => dispatch(reactionAdded({ postId: post.id, reaction:name,}))

        return <button key={name} onClick={react} className="muted-button reaction-button">
            {emoji}  {post.reactions && post.reactions[name]}
        </button>
    })
    
    return <div>{reactionButtons}</div>
}