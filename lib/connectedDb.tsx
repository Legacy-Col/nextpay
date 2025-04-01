import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_URL as string;

const connectedDb = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('We are finally connected')
    } catch (error: any) {
        console.log("Connection Error", error.message);
    }
}

export default connectedDb;