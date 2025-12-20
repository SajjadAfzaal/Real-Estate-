import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg bg-white' id='username'/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg bg-white' id='email'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg bg-white' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Sign Up</button>
      </form>

      <div className='flex justify-center items-center gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to="/signin" className="text-blue-500 hover:underline">Log In</Link>
      </div>
    </div>
  )
}
