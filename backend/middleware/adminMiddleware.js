const jwt = require("jsonwebtoken")

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized"})
    }

    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: "Access Denied: Admins Only" });
        }

        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }
}

module.exports = verifyAdmin;

   