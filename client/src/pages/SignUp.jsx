import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log("Response:", data);
  }
  console.log(formData);

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg bg-white' id='username'  onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg bg-white' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg bg-white' id='password' onChange={handleChange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80' type='submit'>Sign Up</button>
      </form>

      <div className='flex justify-center items-center gap-2 mt-4'>
        <p>Have an account?</p>
        <Link to="/signin" className="text-blue-500 hover:underline">Log In</Link>
      </div>
    </div>
  )
}
