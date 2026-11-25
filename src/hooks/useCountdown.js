import { useEffect, useState } from 'react'

function getRemaining(targetISO) {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now())
  const total = Math.floor(diff / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
    done: total <= 0,
  }
}

export default function useCountdown(targetISO) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetISO))

  useEffect(() => {
    setRemaining(getRemaining(targetISO))
    const id = setInterval(() => setRemaining(getRemaining(targetISO)), 1000)
    return () => clearInterval(id)
  }, [targetISO])

  return remaining
}
