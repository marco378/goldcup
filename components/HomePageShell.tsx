'use client'

import { useEffect, useState } from 'react'
import PageLoader from './PageLoader'

export default function HomePageShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setReady(true)
    }, 800)

    const unlockTimer = window.setTimeout(() => {
      document.body.classList.remove('is-loading')
    }, 1700)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(unlockTimer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  return (
    <>
      <PageLoader />
      <div
        className={`homePageShell ${ready ? 'isReady' : ''}`}
        style={ready ? undefined : { opacity: 0, visibility: 'hidden' }}
      >
        {children}
      </div>
    </>
  )
}
