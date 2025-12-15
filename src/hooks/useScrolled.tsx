'use client'

import React, { createContext, useContext, useState } from 'react'

interface ScrolledContextType {
  hasScrolled: boolean
  setHasScrolled: (scrolled: boolean) => void
}

const ScrolledContext = createContext<ScrolledContextType | undefined>(
  undefined,
)

export const ScrolledProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  return (
    <ScrolledContext.Provider
      value={{
        hasScrolled,
        setHasScrolled,
      }}
    >
      {children}
    </ScrolledContext.Provider>
  )
}

export const useScrolled = () => {
  const context = useContext(ScrolledContext)
  if (!context) {
    throw new Error('useScrolled must be used within ScrollProvider')
  }

  return context
}
