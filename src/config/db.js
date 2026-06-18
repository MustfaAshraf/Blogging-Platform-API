import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully...");
        
    } catch (error) {
        console.log(`Database faild to connect: ${error.message}`);
        process.exit(1);
    }
}

export default database