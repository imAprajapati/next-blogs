"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import axios from 'axios'

function Login() {
  const router = useRouter();
 const [user , setUser] = React.useState(
    {
      username: '',
      password: ''
    }
 )
 const [buttonDisabled , setButtonDisabled] = React.useState(true);
 const [loading, setLoading] = React.useState(false)
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post('/api/users' , {...user , action: 'login'})
      if(res.data.success) {
        let user = res.data.isUser.username
        router.push(`/profile/${user}`)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if(user.username.trim() && user.password.trim()) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <div className='w-full flex items-center justify-center h-screen relative'>
      <div className='border z-10 border-solid border-dark h-96 rounded-md w-96 shadow-md'>
        <h1 className='text-center text-xl font-semibold sm:bg-green-800 md:bg-red-700 lg:bg-blue-950 py-1 text-white mt-5'>Login</h1>
        <div>
          <form className='flex flex-col items-center justify-center mt-5'>
            <label htmlFor="" className='w-80 h-8 text-black'>Username</label>
            <input  
            onChange={(e) => setUser({...user , username: e.target.value})}
            className='border text-black border-solid border-dark rounded w-80 h-9 px-2 outline-none' type="text" placeholder='Username' />
            <label htmlFor="" className='w-80 h-8 mt-5 text-black'>Password</label>
            <input
            onChange={(e) => setUser({...user , password: e.target.value})}
            className='border text-black border-solid border-dark w-80 rounded h-9 px-2 outline-none' type="password" placeholder='Password' />
            <button 
            onClick={handleSubmit}
            disabled={buttonDisabled}
            className={`text-black ${loading?'bg-green-600':''} rounded border border-solid border-black  w-80 h-10 mt-9 px-2 bg-gradient-to-r font-medium`}>{loading?'Login...':'Login'}</button>
          </form>
          <div className='mt-8 flex items-center justify-end mr-8'>
          <a href="/signup" className='text-blue-600 underline underline-offset-2 font-serif'><span className='text-black'>Don't have account?</span> here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login