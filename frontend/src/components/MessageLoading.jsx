import React from 'react'

const MessageLoading = () => {
    return (
        <div className="p-4 bg-slate-50 border 
        dark:bg-gray-950/70
        dark:border-gray-700
        border-slate-200 rounded-full inline-flex loader items-center gap-1.5 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce">

            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce">

            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce">

            </div>
        </div>
    )
}

export default MessageLoading