const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DBConnection = async (req, res)=>{
    try{
        const MONGO_URI = process.env.MONGO_URL;
        await mongoose.connect(MONGO_URI);
        console.log("Database connected");
        
    }
    catch(err){
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = DBConnection;