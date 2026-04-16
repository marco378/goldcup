'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHidden(true)
    }, 300) // quick load

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className={`loaderShell ${hidden ? 'isHidden' : ''}`}>
      <div className="loaderSpinner" />

      <style jsx>{`
        .loaderShell {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;

          background: #050505;
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }

        .isHidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .loaderSpinner {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-top-color: rgba(255, 184, 18, 0.9);
          animation: spin 0.8s linear infinite;
          box-shadow: 0 0 18px rgba(255, 184, 18, 0.15);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .loaderSpinner {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  )
}