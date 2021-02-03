import { client } from '../../api/client'
import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'

export const fetchPost = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const addPost = createAsyncThunk(
    'posts/addNewPost',
    async (initialPost) => {
        const response = await client.post('fakeApi/posts', { post: initialPost })
        return response.post
    }
)

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const postsSlice = createSlice({
    initialState,
    name: 'posts',
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                if (existingPost.reactions[reaction]) {
                    existingPost.reactions[reaction]++
                } else {
                    existingPost.reactions[reaction] = 1
                }
            }
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.content = content
                existingPost.title = title
            }
        },
    },
    extraReducers: {
        [addPost.fulfilled]: postAdapter.addOne,
        [fetchPost.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPost.fulfilled]: (state, action) => {
            postAdapter.upsertMany(state, action.payload)
            state.status = 'succeeded'
        },
        [fetchPost.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    },
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectPostsByUser = createSelector(
    [selectAllPosts, (_, userId) => userId],
    (posts, userId) => {
        return posts.filter((post) => post.user === userId)
    }
)

export default postsSlice.reducer
