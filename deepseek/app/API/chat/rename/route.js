import connectdb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const {userId} = getAuth(req)

        if(!userId){
            return NextResponse.json({success:false,message:"user is not authenticated",})
        }


        const {chatId,name} = await req.json();

        //connect to the database and update the chat name
        await connectdb();
        await Chat.findOneAndUpdate({_id:chatId,userId},{name})


        return NextResponse.json({success:true,message:"chat Renamed"});
    }catch(error){
        return NextResponse.json({success:false,message:error.message});
    }
}