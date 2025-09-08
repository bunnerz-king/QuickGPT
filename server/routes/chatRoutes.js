import express from "express";
import { createChat, deleteChat, getChatById, getChats } from "../controllers/chatController.js";
import { protect } from "../middlewares/Auth.js";

const chatRouter = express.Router();

chatRouter.get('/create', protect, createChat);
chatRouter.get('/get', protect, getChats);
chatRouter.get('/:id', protect, getChatById);
chatRouter.post('/delete', protect, deleteChat);

export default chatRouter;