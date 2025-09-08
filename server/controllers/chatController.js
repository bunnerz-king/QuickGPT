
// new chat

import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name,
        }

        const chat = await Chat.create(chatData);
        res.json({success: true, chat});
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

// get chats

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({userId}).sort({updatedAt: -1});

        res.json({success: true, chats});
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

// get chatById

export const getChatById = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const chat = await Chat.findOne({userId, _id: id})

        res.json({success: true, chat});
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}

// delete chats

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId} = req.body;

        await Chat.deleteOne({_id: chatId, userId})

        res.json({success: true, message: 'Chat Deleted'});
    } catch (error) {
        res.json({success: false, error: error.message})
    }
}