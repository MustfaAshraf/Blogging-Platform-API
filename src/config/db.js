import mongoose from "mongoose";

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/metaDB')
        console.log("Database Connected Successfully...");
        
    } catch (error) {
        console.log(`Database faild to connect: ${error.message}`);
        process.exit(1);
    }
}

export default database