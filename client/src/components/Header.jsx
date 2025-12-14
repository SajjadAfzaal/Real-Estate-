import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className = 'bg-slate-200 shadow-md'>

      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Star</span>
          <span className='text-slate-800'>Estate</span>
        </h1> 
        </Link>

        <form className='flex items-center  bg-slate-100 p-2 rounded-lg'>
          <input 
          type="text" 
          placeholder='Search...' 
          className='focus:outline-none bg-transparent w-24 sm:w-64'
          
          />
          <FaSearch className='inline ml-2 text-slate-600'/>
        </form>

        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
          <Link to='/Signin'>
          <li className='text-slate-700 hover:underline'>Sign in</li>
          </Link>
        </ul>

      </div>

    

    </header>
   
  )
}
