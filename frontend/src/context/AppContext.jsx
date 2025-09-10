import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets"
import api from "../api/api";
import toast from "react-hot-toast";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [loadingUser, setLoadingUser] = useState(false)


    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token != null) {
            try {
                setLoadingUser(true);
                const { data } = await api.get('/api/user/data', {
                    headers: {
                        Authorization: token
                    }
                })

                if (data.success) {
                    setUser(data.user)

                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
                localStorage.clear('token');
            }
            setLoadingUser(false);
        }
    }

    const createNewChat = async () => {
        try{
            const newchat = await api.get('/api/chat/create');
            await fetchUserChats();
            navigate(`/${newchat.data.chat._id}`)
        } catch (e) {

        }
    }
    const fetchUserChats = async () => {
        try{
            const {data} = await api.get('/api/chat/get');
            if(data.success){
                setChats(data.chats);
                if(data.chats.length === 0){
                    await createNewChat();
                } 
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const setFirstChat = () => {
        if(chats.length){
            navigate(`/${chats[0]?._id}`)        
        }   
    }

    useEffect(() => {
        if (user) {
            fetchUserChats();
        } else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user])


    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme])

    const toggleTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem('theme', theme);
    }
    const value = { navigate, user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, toggleTheme, fetchUser, createNewChat, loadingUser, fetchUserChats, setFirstChat }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}