import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        message:[
            {
                role:{type:String,required:true},
                content:{type:String,required:true},
                timestamp:{type:Number,required:true},
            }
        ],
        userId:{type:String,required:true}
    },
    {
        timestamps:true
    }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat",chatSchema);
export default Chat;