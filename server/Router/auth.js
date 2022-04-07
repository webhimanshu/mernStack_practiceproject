const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser =require("cookie-parser");
router.use(cookieParser())
require("../db/conn.js");
require("../middleware/authenticate");
const User = require("../model/userScheme");
const authenticate=require("../middleware/authenticate")
router.get("/", (req, resp) => {
  resp.send("HELLO FROM ROUTER.js");
});
// register route
// it will take req.body data and send it user and print in the console baby
router.post("/register", async (req, resp) => {
      // resp.json({message:req.body});
 console.log(req.body);
  console.log("Hello from register")
  const { name, email, phone, work, password, confirmPassword } = req.body;
  if (!name || !email || !phone || !work || !password || !confirmPassword) {
    console.log(req.body)
    return resp.status(422).json({ message: "please fill all fields " });
    
  }
  try {
    const userPresent = await User.findOne({ email: email });
    if (userPresent) {
      return resp.status(422).json({
        message: "email is already present please enter another email",
      });
    } else if (password !== confirmPassword) {
      resp.status(422).json({ message: "confirm password is not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        confirmPassword,
      });
      // yaha pe pre method chalega
      const saved = await user.save();
      console.log("Data Saved");
      resp
        .status(201)
        .json({ message: "data saved successfully", data: saved });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, resp) => {
  //     resp.json(req.body)
  // console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    return resp.status(422).json({ message: "please fill  all fields" });
  }
  try {
    const oneUser = await User.findOne({ email: email });

    if (oneUser) {
      const isMatched = await bcrypt.compare(
        password.toString(),
        oneUser.password
      );
      const token = await oneUser.generateAuthToken();
      console.log(token);
// save cookie 
var expiryDate=new Date(Date.now() + (30*24*3600000))
      resp.cookie("jwtToken", token, {
        expires: expiryDate,// expire date in 30 days ms
        httpOnly:true// it will work on http 
      });

      if (!isMatched) {
        resp.status(400).json({ message: "User Error" });
      } else {
        resp.status(201).json({ message: "login Successfull", data: oneUser });
      }
    } else {
      resp.status(400).json({ message: "invalid creaditials" });
    }
  } catch (err) {
    console.log(err);
  }
});




router.get("/about", authenticate, (req, resp) => {
  console.log("hELLO FROM  about page");
  resp.send(req.user);
 
});


router.get("/getUser",authenticate,(req,resp)=>
{
  console.log("hELLO FROM  getUser page");
  resp.send(req.user);
 
})

router.post("/contact",authenticate,async (req,resp)=>
{
try
{
const{name,phone,msg,work}=req.body;
if(!name,!phone,!msg,!work)
{
return resp.send({error:"plese fill all details"});
}
const userContact=await user.findOne({_id:req.id});
if(userContact)
{
const usermsg=await userContact.addMsg({name,phone,msg,work});
await userContact.save();
resp.status(201),send({message:"message saved succefully"});
}
}catch(err)
{
console.log(err);
}
});

router.get("/logout",(req,resp)=>
{
  console.log("hello from logout")
  resp.clearCookie('jwtToken',{path:"/"});
  resp.status(200).send("user Logout")
})

module.exports = router;
