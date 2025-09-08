import React, {useEffect} from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {

    useEffect(()=>{
        Prism.highlightAll();
    },[message.content])

    return (
        <div>
            {message.role === 'user' ? (
                <div className="flex items-start justify-end my-4 gap-2">
                    <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-gray-950/70 border border-[#80609F]/30 rounded-md max-w-2xl">
                        <p className="">{message.content}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{moment(message.timestamp).fromNow()}</span>
                    </div>
                    <img src={assets.user_icon} className="w-8 rounded-full" />
                </div>
            ) : (
                <div className="inline-flex flex-col gap-2 p-2 px-4 pt-0 md:max-w-[90%] my-4 bg-slate-50 dark:bg-gray-950/70 border border-[#80609F]/30 rounded-md">
                    {message.isImage ? (
                        <img src={message.content} className="w-full max-w-md mt-2 rounded-md" />
                    ) : (
                        <div className="reset-tw">
                            <Markdown
                            >{message.content}</Markdown>
                        </div>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">{moment(message.timestamp).fromNow()}</span>
                </div>
            )}
        </div>
    )
}

export default Message