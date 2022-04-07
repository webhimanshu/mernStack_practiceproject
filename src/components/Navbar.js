import React,{useState} from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const[show ,setShow]=useState(true); 
  return (
<>
 <div className="w-full bg-red-600 h-14  flex justify-between items-center px-12" >
 <h1 className="text-xl font-medium">Devoid</h1>
 <ul>
     <li className="inline border border-black mx-4 p-2"><Link to="/">Home</Link></li>

     <li className="inline border border-black mx-4 p-2"><Link to="/about">About</Link></li>

     <li className="inline border border-black mx-4 p-2"><Link to="/contact">Contact</Link></li>


     <li className="inline border border-black mx-4 p-2"><Link to="/login">Login</Link></li>

     
     <li className="inline border border-black mx-4 p-2"><Link to="/signup">Signup</Link></li>

     <li className="inline border border-black mx-4 p-2"><Link to="/logout">Logout</Link></li>

 </ul>
 </div>
      </>
      );
};

export default Navbar;