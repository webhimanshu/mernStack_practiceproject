import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const About = () => {
  const [user, setUser] = useState({});
const navigate=useNavigate();
   const callAboutPage = async () => {
     try{
    const res = await fetch("/about", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
   
    const data=await res.json();
    console.log(data);
    setUser(data);
    if(res.status!==200)
    {
      throw new Error("not valid")
    }
   }catch(err)
   {
      console.log(err);
      navigate("/")
   }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <div className="w-[500px] h-[200px] border shadow-lg shadow-slate-600 m-auto mt-[50px]">
      <form method="GET">
        <div className="">
          <label>User Id</label>
          <label>{user._id}</label>
        </div>

        <div className="">
          <label>{user.name}</label>
        </div>

        <div className="">
          <label>Email</label>
          <label>{user.email}</label>
        </div>

        <div className="">
          <label>Phone</label>
          <label>{user.phone}</label>
        </div>

        <div className="">
          <label>Profession</label>
          <label>{user.work}</label>
        </div>
      </form>
    </div>
  );
};

export default About;
