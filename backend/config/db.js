const mongoose = require("mongoose");

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected")
    } catch (error) {
        console.log("Connection failed: ", error.message);
        process.exit(1);
    }
}

module.exports  = connectDb;