const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const Login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).send("Please Enter all Fields");
    }
    // checking if userobject exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.status(400).send("User Not Found");
    }
    // checking validity
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        return res.status(400).send("Invalid Credentials");
    }

    const logToken = jwt.sign({
        id: existingUser._id,
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin
    },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );

    existingUser.password = undefined;

    res.status(200).json({
        success: true,
        user: {
            id: existingUser._id,
            name: existingUser.name,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        },
        token: logToken,
        message: "User Logged In Successfully"
    });
};


const Register = async (req, res) => {
    try {
        const { name, username, email, password, adminKey } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).send("Please enter all fields");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPass = await bcrypt.hash(password, 10);

        // Using the DB to create n store a new userobj
        const UserObj = new User({
            name,
            username,
            email,
            password: hashedPass
        });

        if (adminKey === process.env.MASTER_ADMIN_CODE) {
            UserObj.isAdmin = true;
        }

        await UserObj.save();

        // generating access token for the user just created
        const regToken = jwt.sign(
            {
                id: UserObj._id,
                name: UserObj.name,
                username: UserObj.username,
                email: UserObj.email,
                isAdmin: UserObj.isAdmin
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        UserObj.password = undefined;

        res.status(200).json({
            success: true,
            user: {
                id: UserObj._id,
                name: UserObj.name,
                username: UserObj.username,
                email: UserObj.email,
                isAdmin: UserObj.isAdmin
            },
            token: regToken,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


module.exports = {
    Login,
    Register
}