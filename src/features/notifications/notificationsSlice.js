import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { getState }) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotifications] = allNotifications
        const latestTimeStamp = latestNotifications ? latestNotifications.date : ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimeStamp}`
        )
        return response.notifications
    }
)

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, _) {
            Object.values(state.entities).forEach(notifications => {
                notifications.read = true
            })
        },

    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, { payload }) => {
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })
            notificationsAdapter.upsertMany(state, payload)
        },
    },
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors(state => state.notifications)