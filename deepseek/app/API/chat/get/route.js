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

        //connect to database to fetch all the data for the user 

        const data = await Chat.find({userId});
        return NextResponse.json({success:true,message:"chat created"});
    }catch(error){
        return NextResponse.json({success:false,message:error.message});
    }
}