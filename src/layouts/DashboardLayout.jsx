import React, { useState } from 'react'
import Header from '../components/dashboard/Header'


export default function DashboardLayout({ children }) {

  return (
    <div className='w-full h-screen font-sans'>
      <section className="w-full py-1 fixed z-10 top-0 bg-white dark:bg-dark-light">
        <div className='w-full lg:w-[90%] xl:w-[75%] m-auto px-3'>
          <Header></Header>
        </div>
      </section>

      <section className='w-full lg:w-[90%] xl:w-[75%] m-auto mt-[50px] py-4 px-3'>
        {children}
      </section>
    </div>
  )
}
