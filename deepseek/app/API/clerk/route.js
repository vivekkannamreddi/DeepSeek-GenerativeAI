
import { Webhook } from "svix";
import connectdb from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {
    console.log("Webhook POST endpoint hit");   
    const wh = new Webhook(process.env.SIGNING_SECRET);
    const headerPayload = await headers();

    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-timestamp": headerPayload.get("svix-timestamp"),
        "svix-signature": headerPayload.get("svix-signature"),
    };

    // Get the payload and verify
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders);

    // Prepare user data
    const userdata = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
    };

    await connectdb();

    switch (type) {
        case "user.created":
            await User.create(userdata);
            break;
        case "user.updated":
            await User.findByIdAndUpdate(data.id, userdata);
            break;
        case "user.deleted":
            await User.findByIdAndDelete(data.id);
            break;
        default:
            break;
    }

    return NextRequest.json({ message: "event received" });
}


