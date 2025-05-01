import connectdb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {userId} = getAuth(req)

        if(!userId){
            return NextResponse.json({success:false,message:"user is not authenticated",})
        }

        //preparing the chat data to be saved in the database

        const chatdata = {
            userId,
            messages:[],
            name:"New Chat",
        };

        //connecting to the databse to create new caht


        await connectdb();

        await Chat.create(chatdata);

        return NextResponse.json({success:true,message:"chat created"});

    }catch(error){
        return NextResponse.json({success:false,message:error.message});
    }
}