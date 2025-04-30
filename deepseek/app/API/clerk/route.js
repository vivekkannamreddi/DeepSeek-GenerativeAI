import { Svix } from "svix";
import  {webhook} from Svix;
import connectdb from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";

export async function POST(req){
    const wh = new webhook(process.env.SIGNING_SECRET);
    const headerpayload = new headers();
    const svixHeaders={
        "svix-id":headerpayload.get("svix-id"),
        "svix-signature":headerpayload.get("svix-signature"),
    };

    //get the payload and verify

    const payload = await req.json();
    const body=JSON.stringify(payload);
    const {data,type} = wh.verify(body,svixHeaders);


    //prepare user data to save in database 

    const userdata = {
        _id:data.id,
        email:data.email_addresses[0].email_addresses,
        name:`${data.first_name} ${data.last_name}`,
        image:data.image_url,
    };


    await connectdb();
}