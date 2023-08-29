import React from 'react'

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen bg-black text-white antialiased overflow-hidden relative z-0">
      {children}
    </div>
  )
}

export default RootLayout
