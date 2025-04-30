import { Svix } from "svix";
import  {webhook} from "Svix";
import connectdb from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req){
    const wh = new webhook(process.env.SIGNING_SECRET);
    const headerpayload = headers();
    const svixHeaders={
        "svix-id":headerpayload.get("svix-id"),
        "svix-timestamp":headerpayload.get("svix-timestamp"),
        "svix-signature":headerpayload.get("svix-signature"),
    };

    //get the payload and verify

    const payload = await req.json();
    const body=JSON.stringify(payload);
    const {data,type} = wh.verify(body,svixHeaders);


    //prepare user data to save in database 

    const userdata = {
        _id:data.id,
        email:data.email_addresses[0].email_address,
        name:`${data.first_name} ${data.last_name}`,
        image:data.image_url,
    };


    await connectdb();

    switch(type){
        case 'user.created':
            await User.create(userdata)
            break;

        case 'user.updated':
            await User.findByIdAndUpdate(data.id,userdata)
            break;

        case 'user.deleted':
            await User.findByIdAndDelete(data.id)
            break;

        default:
            break;
    }
    return NextRequest.json({message:"event received"});
}