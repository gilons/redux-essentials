import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";


export const fetchUsers = createAsyncThunk('/users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users');
    return response.users
})
const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userAdded: {
            reducer: (state, action) => {

            }
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled]: usersAdapter.setAll
    }
})

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users)

export default userSlice.reducer