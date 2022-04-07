import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate();
  const [state, setstate] = useState({
    email:"",
    password:""
  });
  const {email,password}=state;
const handleSubmit= async(e)=>
{
e.preventDefault();
try
{
const res=await fetch("/signin",
{
 method:"POST",
 headers:{"Content-Type":"application/json"},
 body:JSON.stringify({email,password})
   
})
console.log(res);
const data=await res.json();
if(data.status===400 || !data)
{
window.alert("invalid login");
console.log("invalid login")
}else
{
  window.alert("login successful");
  console.log("DONE")
  navigate("/")
}
}catch(err)
{
console.log(err);
}

}
const handleChange=(e)=>
{
const {name,value}=e.target;
setstate({...state,[name]:value});
}


  return (
    <div className="border  w-[400px] h-[200px] m-auto mt-36 shadow-lg shadow-slate-700">
      <form  method="POST">
      <div className='mt-11'>
<i className="fa-solid fa-envelope relative left-4"></i>
<input type="text" placeholder='Your email'  value={email}   name="email" className='w-11/12 pl-7 border-b border-0 focus:outline-none' onChange={handleChange}/>
</div>



<div className='my-6'>
<i className="fa-solid fa-lock relative left-4"></i>
<input type="email" placeholder='Your password' value={password}  name="password" className='w-11/12 pl-7 border-b border-0 focus:outline-none ' onChange={handleChange}/>
</div>


<button type='submit' className='bg-cyan-600 outline-none border-none p-2 rounded text-white mt-2 ml-4  m-auto'  value="Submit"  onClick={handleSubmit}>
Submit
</button>

      </form>
    </div>
  )
}

export default Login