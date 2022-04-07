// this is code for userAuthentication
const jwt=require("jsonwebtoken");
const userScheme=require("../model/userScheme");

const authenticate=async (req,resp,next)=>
{
    try{
const token=req.cookies.jwtToken;
console.log("Token",token)
if(token===undefined){throw new Error("Token not found")}
const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
console.log("verifyToken",verifyToken);
const rootUser= await userScheme.findOne({_id:verifyToken._id, "tokens.token":token});// in tokens.token if it get matched with token  then user is available or user is genenioun
if(!rootUser){throw new Error("USer Not Found")};
req.token=token;
req.user=rootUser;
req.id=rootUser._id;
console.log(rootUser)
next();
    }
    catch(err)
    {
        resp.status(401).send("Unathorized user:token not found");
        console.log(err);
    }
}
module.exports=authenticate;