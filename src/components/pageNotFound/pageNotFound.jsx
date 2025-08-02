import React from 'react'
import error from './error.jpg'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
    const navigate=useNavigate()
    return (

        <div className='mx-auto flex flex-col gap-y-3 w-4/5  md:w-3/5 justify-center items-center min-h-screen pt-5 py-2 select-none'>
            <p className="font-PoppinsRegular text-base text-[#3B235D] " >Oops! The page you're looking for does not exist.</p>
           <button onClick={()=>{navigate('/')}}  className="px-2 py-2 rounded-md   w-[6rem] bg-[#3B235D]  text-white font-PoppinsRegular "  >Go Home  </button>
            <img src={error} className=' h-[20rem] sm:h-[25rem]' />
        </div>
    )
}
