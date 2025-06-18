const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const GetUserProfile = async (req, res) => {
    try {
        const U_id = req.user.id;
        const user = await User.findById(U_id);
        
        if(!user){
            return res.status(404).send("User Not Found");
        }
        res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.log("Some Error Occurred");
        res.status(500).send(error.message);
        
    }
}

module.exports = {
    GetUserProfile
}