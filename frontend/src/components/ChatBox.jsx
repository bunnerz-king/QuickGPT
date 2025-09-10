import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import MessageLoading from './MessageLoading';

const ChatBox = () => {
    const containerRef = useRef(null);
    const { setFirstChat, chats, theme, fetchUserChats } = useAppContext()

    const {id} = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [prompt, setPrompt] = useState('');
    const [mode, setMode] = useState('text');
    const [isPublished, setIsPublished] = useState(false);

    const onSubmit = async (e) => {
        try{
            e.preventDefault();
            setLoading(true);
            const promptCopy = prompt;
            setPrompt('');
            setMessages(prev => [...prev, {role: 'user', content: promptCopy, timestamp: Date.now(), isImage: false}]);

            const {data} = await api.post(`/api/message/${mode}`, {
                chatId: id, prompt: promptCopy, isPublished}
            )

            if(data.success){
                setMessages(prev => [...prev, data.reply])
            }
            await fetchUserChats();
        } catch (error) {
            toast.error(error.message);
        }
        setPrompt('');
        setLoading(false);
    }

    const fetchChat = async () => {
        try{
            const {data} = await api.get(`/api/chat/${id}`)
            setMessages(data.chat.messages)
        }catch(error){

        }
    }
    useEffect(()=>{
        if(containerRef.current){
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight
            })
        }
    }, [messages])

    useEffect(() => {
        if (id) {
            fetchChat();
        }
    }, [id])

    useEffect(() => {
        if(id){
            fetchChat();
        } 
    }, [])

    useEffect(()=>{
       if(!id && chats.length){
            setFirstChat()
       }
    }, [chats, id])

    return (
        <div className="flex-1 flex flex-col justify-between m-4 md:px-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
            {/* Chat Messages */}
            <div ref={containerRef} className="flex-1 mb-5 pb-4 overflow-y-scroll">
                {messages.length == 0 && (
                    <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
                        <img src={theme == 'dark' ? assets.logo_full : assets.logo_full_dark}
                            className='w-full max-w-56 sm:max-w-68'
                        />
                        <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
                            Ask me anything.
                        </p>
                    </div>
                )}

                {messages.map((message, index) => <Message key={index} message={message} />)}

                {/* Loading Animation */}
                {
                    loading && <MessageLoading/>
                }
            </div>

                {/* {mode == 'image' && (
                    <label className="inline-flex items-center gap-2 mb-3 text-sm mx-auto">
                        <p className="text-xs">Publish Generated Image to Community</p>
                        <input type="checkbox" className="cursor-pointer" checked={isPublished}
                        onChange={(e)=>setIsPublished(e.target.checked)}
                        ></input>
                    </label>
                )} */}

            {/* Input box */}
            <form onSubmit={onSubmit} className="bg-gray-100/70 dark:bg-slate-950 border border-gray-200 dark:border-gray-400 rounded-full w-full p-3 pl-4 mx-auto flex gap-4 items-center">
                <select onChange={(e)=>setMode(e.target.value)}
                value={mode} className='text-sm pl-3 pr-2 outline-none'>
                    <option className="dark:bg-slate-900" value="text">Text</option>
                    <option className="dark:bg-slate-900" value="image">Image</option>

                </select>
                <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} type="text" placeholder={mode == 'image' ? "Describe an image to generate" : "Ask me anything"} className="flex-w w-full text-sm outline-none" required/>
                <button disabled={loading}>
                    <img src={loading? assets.stop_icon : assets.send_icon} className="w-8 cursor-pointer" alt=""/>
                </button>
            </form>
        </div>
    )
}

export default ChatBox