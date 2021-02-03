import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassName = classNames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b>
          {notification.message}
        </div>
        <div>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderNotifications}
    </section>
  )
}
