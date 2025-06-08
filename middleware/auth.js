const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next)=>{
    //Read token from the authorization header
    const token = req.header("Authorization");
    if(!token)
    {
        return res.status(400).json({message:"Access denied, no token provided"});
    }
    try{
        //remove bearer in the prefix
        const actualToken = token.replace("Bearer ","").trim();
        //console.log("Token:", actualToken);
        if (!actualToken) return res.status(401).json({ message: "No token provided" });

        //verify toekn using secret
        const decodedToken = jwt.verify(actualToken, process.env.JWT_SECRET);

        req.user = {id: decodedToken.id};

        next();
    }
    catch(error)
    {
        res.status(401).json({"message":"Server error in the middleware while authenticating the user"})
    }


}

module.exports = authMiddleware;