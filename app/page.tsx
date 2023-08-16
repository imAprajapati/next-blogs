'use client'

import Image from 'next/image'
import type {RootState} from './redux/store'
import {useSelector,useDispatch} from 'react-redux'
import {increment,decrement,incrementByAmount} from './redux/features/counter/counterSlice'
import Banner from './components/Banner'
export default function Home() {
  const dispatch = useDispatch()
  const count = useSelector((state:RootState )=> state.counter.value)
  return (
    <main className="">
      <Banner/>
      <div className='w-full h-screen'>
      </div> 
    </main>
  )
}
