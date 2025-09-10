import axios from "axios";
import openai from "../configs/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";


export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        
        if(req.user.credits < 1){
            return res.json({success: false, message: "You don't have enough credits"})
        }
        
        const { chatId, prompt } = req.body;
       
        const chat = await Chat.findOne({ userId, _id: chatId });
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const {choices} = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [ ...chat.messages,
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = {...choices[0].message, timestamp: Date.now(),
            isImage: false
        }

        chat.messages.push(reply);
        await chat.save();

        // decrease credits
        // await User.updateOne({_id: userId}, {$inc: {credits: -1}})

        res.json({success: true, reply})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        const {prompt, chatId, isPublished} = req.body;

        const chat = await Chat.findOne({userId, _id: chatId});

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })

        const encodedPrompt = encodeURIComponent(prompt);

        // generate ai image
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: 'arraybuffer'})

        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;

        // upload to imagekit

        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: 'quickgpt',
        })

        const reply = {role: 'assistant',
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished
        }

        res.json({success: true, reply})

        chat.messages.push(reply);
        await chat.save();


    } catch (error) {
         throw new Error(error);
    }
}