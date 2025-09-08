import openai from "../configs/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";


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