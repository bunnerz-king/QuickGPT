import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const timeout = setTimeout(()=>{
        navigate('/')
    }, 8000)

    return ()=> clearTimeout(timeout);
  }, [])

  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center h-screen w-screen text-white text-2xl">
        <div className="w-10 h-10 rounded-full border-3 border-purple-700  
        border-t-transparent 
        dark:border-t-transparent
        dark:border-purple-500 animate-spin"></div>
    </div>
  )
}

export default Loading