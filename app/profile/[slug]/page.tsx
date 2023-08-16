import React from 'react'

export default function page({params}: {params: {slug: string}}) {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <h1 className='text-black'>this is the user <span className="bg-orange-500 p-2 rounded capitalize">{params.slug}</span></h1>
    </div>
  )
}
