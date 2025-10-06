'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default Layout
=======
export default Layout
>>>>>>> 00a5a9bbee4e65110b83fee8da6a7b95c59306b7
