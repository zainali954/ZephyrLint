import  jwt  from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import apiError from "../utils/apiError.js";
const protect = asyncHandler(async(req, res, next)=>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new apiError(401, "Unauthorized. No access token provided."); 
    }
    
    const token = authHeader.split(" ")[1];

    let decoded ;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new apiError(401, 'Unauthorized. Token has expired.'); 
          } else if (err.name === 'JsonWebTokenError') {
            throw new apiError(401, 'Unauthorized. Invalid token.');
          } else {
            throw new apiError(401, 'Unauthorized. Authentication failed.'); 
          }
    }

    const { id } = decoded;

    const user = await User.findById(id);
    if (!user) {
        throw new apiError(401, "User no longer exists."); 
    }
    req.user = user;

    next();
});

export default protect