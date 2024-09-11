import React from 'react'

function page() {
  return (
    <div className='w-screen h-screen justify-center flex flex-col items-center gap-5 '>
      <h1 className='font-bold textwh'>Signup </h1>

      <form action="" className='flex flex-col justify-center items-center gap-4 bg-blue-300 p-10 rounded-md'>
        <input type="text" placeholder='Username'  className='rounded-md'/>
        <input type="password" placeholder='Enter password' className='rounded-md'/>
        <button className='bg-green-500  rounded-md p-2 text-black font-bold'> Submit </button>
      </form>
    </div>
  )
}

export default page