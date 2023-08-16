import React from 'react'

function Banner() {
  return (
    <div className='w-full h-[70vh] 
    flex justify-between items-center overflow-hidden
    relative
    '>  
      <div className='absolute left-40'>
        <h1 className='font-bold text-5xl w-60'>Free feel to write you expertise</h1>
     </div>
      <div className='w-full'>
        <img 
        className='w-full h-[70vh] object-cover'
        src="https://www.dynamicpixel.co.in/blog/wp-content/uploads/2023/01/e-learning-image-new-123-1024x576.jpg" alt="" />
      </div>
    </div>
  )
}

export default Banner