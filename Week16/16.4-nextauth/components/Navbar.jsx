'use client'
import { signOut,signIn, useSession } from "next-auth/react"


function Navbar() {
  const session=useSession();
  return (
    <div className='w-screen h-10 flex justify-evenly fixed top-0 right-0 left-0'>

        <button onClick={()=> signIn()}>SignIn</button>
        <button onClick={()=> signOut()}>Logout</button>
      {JSON.stringify(session)}
    </div>
  )
}

export default Navbar