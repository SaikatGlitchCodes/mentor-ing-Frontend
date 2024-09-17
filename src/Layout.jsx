import React from 'react'
import Navbar from './Component/Shared/Navbar'

export default function Layout({ children }) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}
