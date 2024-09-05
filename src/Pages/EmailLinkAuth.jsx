import React from 'react'

export default function EmailLinkAuth() {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] '>
      <div className='flex flex-col items-center justify-center p-10 px-24 rounded-lg shadow-lg gap-y-4'>
        <h1 className='text-5xl font-semibold'> Check your Inbox </h1>
        <p>Link can be present in SPAM folder lookout</p>
        <button className='mt-8 btn btn-primary'>Re-Send Email</button>
      </div>

    </div>
  )
}
