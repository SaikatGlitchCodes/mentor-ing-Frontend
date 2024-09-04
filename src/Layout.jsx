import React from 'react'
import Navbar from './Component/Navbar'

export default function Layout({ children }) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}
