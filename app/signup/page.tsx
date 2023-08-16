"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
function SignUp() {
  const router = useRouter();
  const [user , setUser] = React.useState(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  )
  const [buttonDisabled , setButtonDisabled] = React.useState(true);
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users' , {...user,action: 'register'})
      if(res.data) {
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    if(user.username.trim() && user.email.trim() && user.password.trim() && user.confirmPassword.trim()) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className='w-full flex items-center justify-center h-screen relative'>
      <div className='border z-10 border-solid border-dark h-[85vh] rounded-md w-96 shadow-md'>
        <h1 className='text-center text-xl font-semibold sm:bg-green-800 md:bg-red-700 lg:bg-blue-950 py-1 text-white mt-5'>SignUp</h1>
        <div>
          <form className='flex flex-col items-center justify-center mt-5'>
            <label htmlFor="" className='w-80 h-8 text-black'>Username</label>
            <input
            onChange={(e) => setUser({...user , username: e.target.value})}
            className='text-black border border-solid border-dark rounded w-80 h-9 px-2 outline-none' type="text" placeholder='Username' />
            <label htmlFor="" className='w-80 h-8 text-black mt-5'>Email</label>
            <input 
            onChange={(e) => setUser({...user , email: e.target.value})}
            className='text-black border border-solid border-dark rounded w-80 h-9 px-2 outline-none' type="email" placeholder='Email' />
            <label htmlFor="" className='w-80 h-8 mt-5 text-black'>Password</label>
            <input 
            onChange={(e) => setUser({...user , password: e.target.value})}
            className='text-black border border-solid border-dark w-80 rounded h-9 px-2 outline-none' type="password" placeholder='Password' />
            <label htmlFor="" className='w-80 h-8 mt-5 text-black'>Confirm Password</label>
            <input 
            onChange={(e) => setUser({...user , confirmPassword: e.target.value})}
            className='text-black border border-solid border-dark w-80 rounded h-9 px-2 outline-none' type="password" placeholder='Confirm Password' />
            <button 
            onClick={handleSubmit}
            disabled={buttonDisabled}
            className=' text-black rounded  border border-solid border-black w-80 h-10 mt-9 px-2 font-medium'>SignUp</button>
          </form>
          <div className='mt-8 flex items-center justify-end mr-8'>
          <a href="/login" className='text-blue-600 underline underline-offset-2 font-serif'><span className='text-black'>already have account?</span> here</a>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SignUp