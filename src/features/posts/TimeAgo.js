import { parseISO, formatDistanceToNow } from 'date-fns'
import React from "react"
export function TimeAgo({ timestap }) {
  let timeAgo = ''
  if (timestap) {
    const date = parseISO(timestap)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestap}>
      &nbsp; <i>{timeAgo}</i><br/>
    </span>
  )
}
