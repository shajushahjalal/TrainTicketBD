import React from 'react'
import branch_logo_sm from '../../assets/image/synesis_logo.png'
import footer_logo from '../../assets/image/footer_logo.png'

export default function Footer() {
  return (
    <div className='w-full flex justify-between bg-[#f7f7f7] px-5 py-3 flex-col sm:flex-row'>
      <div className='flex-1 text-lg flex gap-3 items-center sm:justify-start justify-center'>
        Powered By :
        <img src={footer_logo} loading="lazy" className='w-32' />
      </div>
      <div className='flex items-center flex-1 sm:justify-end justify-center gap-3 text-lg'>
        Development Partner:
        <img src={branch_logo_sm} loading="lazy" className='w-32' />
      </div>
    </div>
  )
}
