import mongoose from "mongoose";
let cached = global.mongoose || {conn:null,promise:null};

export default async function connectdb(){
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise=mongoose.connect(process.env.MONGODB_URI).then((mongoose)=>mongoose);

    }
    try{
        cached.conn=await cached.promise;
    }
    catch(error){
        console.error("Error connecting to mongodb",error);
    }
    return cached.conn;
}