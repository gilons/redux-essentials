import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice'
import { useSelector } from 'react-redux'

export const Navbar = () => {
  const dispatcher = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnReadNotifications = notifications.filter((n) => !n.read).length

  let unreadNotifications
  if (numUnReadNotifications > 0) {
    unreadNotifications = (
      <span className={'badge'}>{numUnReadNotifications}</span>
    )
  }
  const fetchNewNotifications = () => {
    dispatcher(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to={'/'}>Posts</Link>
            <Link to={'/users'}>Users</Link>
            <Link to={'/notifications'}>
              Notifications {unreadNotifications}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
