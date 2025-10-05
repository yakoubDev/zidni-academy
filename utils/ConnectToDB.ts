import mongoose from "mongoose";


let isConnected = false;
const MONGODB_URI = process.env.MONGODB_URI as string;


export const connectToDB = async () =>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI,{
            dbName:"zidni",
        });

        isConnected = true;
        console.log("MongoDB Connected.");
    } catch (error) {
        console.log(error)
        throw new Error("MongoDB connection error.");
    }
} 