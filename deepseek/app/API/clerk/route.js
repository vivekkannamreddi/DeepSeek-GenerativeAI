// import { Svix } from "svix";
// import  {webhook} from "svix";
// import connectdb from "@/config/db";
// import User from "@/models/User";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req){
//     const wh = new webhook(process.env.SIGNING_SECRET);
//     const headerpayload = headers();
//     const svixHeaders={
//         "svix-id":headerpayload.get("svix-id"),
//         "svix-timestamp":headerpayload.get("svix-timestamp"),
//         "svix-signature":headerpayload.get("svix-signature"),
//     };

//     //get the payload and verify

//     const payload = await req.json();
//     const body=JSON.stringify(payload);
//     const {data,type} = wh.verify(body,svixHeaders);


//     //prepare user data to save in database 

//     const userdata = {
//         _id:data.id,
//         email:data.email_addresses[0].email_address,
//         name:`${data.first_name} ${data.last_name}`,
//         image:data.image_url,
//     };


//     await connectdb();

//     switch(type){
//         case 'user.created':
//             await User.create(userdata)
//             break;

//         case 'user.updated':
//             await User.findByIdAndUpdate(data.id,userdata)
//             break;

//         case 'user.deleted':
//             await User.findByIdAndDelete(data.id)
//             break;

//         default:
//             break;
//     }
//     return NextResponse.json({message:"event received"});
// }




// import { Webhook } from "svix";
// import connectdb from "@/config/db";
// import User from "@/models/User";
// import { headers } from "next/headers";
// import { NextRequest } from "next/server";

// export async function POST(req) {
//     console.log("Webhook POST endpoint hit");   
//     const wh = new Webhook(process.env.SIGNING_SECRET);
//     const headerPayload = await headers();

//     const svixHeaders = {
//         "svix-id": headerPayload.get("svix-id"),
//         "svix-timestamp": headerPayload.get("svix-timestamp"),
//         "svix-signature": headerPayload.get("svix-signature"),
//     };

//     // Get the payload and verify
//     const payload = await req.json();
//     const body = JSON.stringify(payload);
//     const { data, type } = wh.verify(body, svixHeaders);

//     // Prepare user data
//     const userdata = {
//         _id: data.id,
//         email: data.email_addresses[0].email_address,
//         name: `${data.first_name} ${data.last_name}`,
//         image: data.image_url,
//     };

//     await connectdb();

//     switch (type) {
//         case "user.created":
//             await User.create(userdata);
//             break;
//         case "user.updated":
//             await User.findByIdAndUpdate(data.id, userdata);
//             break;
//         case "user.deleted":
//             await User.findByIdAndDelete(data.id);
//             break;
//         default:
//             break;
//     }

//     return NextRequest.json({ message: "event received" });
// }




import { NextResponse } from 'next/server';
import { connect } from '@/config/db';
import User from '@/models/User';

export async function POST(request) {
  await connect();
  try {
    const body = await request.json();
    console.log("📥 Webhook received body:", JSON.stringify(body, null, 2));

    const { id, email_addresses, username, image_url } = body;

    if (!id || !email_addresses?.length) {
      console.error("❌ Missing id or email_addresses:", { id, email_addresses });
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
    }

    const email = email_addresses[0]?.email_address;

    const existingUser = await User.findOne({ clerkUserId: id });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    const newUser = new User({
      clerkUserId: id,
      email,
      username,
      imageUrl: image_url
    });

    await newUser.save();

    console.log("✅ New user saved:", newUser);

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
