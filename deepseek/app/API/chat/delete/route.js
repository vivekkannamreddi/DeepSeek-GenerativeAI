import connectdb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const {userId} = getAuth(req);
        const {chatId} = await req.json()
        if(!userId){
            return NextResponse.json({success:false,message:"user is not authenticated",})
        }


        //connect to the databaase and delete the chat


        await connectdb();

        await Chat.deleteOne({_id:chatId,userId});
        return NextResponse.json({success:true,message:"chat deleted"});
    }catch(error){
        return NextResponse.json({success:false,message:error.message});
    }
}   