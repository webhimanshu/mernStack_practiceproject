const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  messages:
  [
{
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  }, 
  message:
  {
    type:String,
    required:true,
  }
}
  ],
  date:
  {
    type:Date,
    default:Date.now
  },
  tokens:
  [
    {
      token:{
      type:String,
      required:true
    }
  }
  ]
});

// we are genearting jwt token
userScheme.methods.generateAuthToken= async function()
{
try
{
const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
this.tokens=this.tokens.concat({token:token});
await this.save();
return token;
}catch(err)
{
console.log(err);
}
}
//ADDING message
userScheme.methods.addMsg=async function({name,phone,message,work})
{
try
{
this.messages=this.messages.concat({name,phone,message,work});
await this.save();
return this.messages;
}catch(err)
{

}
}
// We are hashing password secure your password

userScheme.pre("save", async function(next)
{
 
  if(this.isModified("password")){
  this.password= await bcrypt.hash(this.password,12);
  this.confirmPassword= await bcrypt.hash(this.confirmPassword,12);
 
}
next(); 
})


const User = mongoose.model("user", userScheme);
module.exports = User;
