import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    confirmPassword: "",
  });
  const { show, setShow } = useState(true);
  const { name, email, phone, work, password, confirmPassword } = state;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setstate({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try{
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        confirmPassword,
      }),
    });

    console.log(res);
    const data = await  res.json();
    console.log(data)
    if(data.status === 422 || !data)
    {
window.alert("Regestration Failed");
console.log("Regestration Failed")
    }else
    {
      window.alert("Regestration Succesful");
      console.log("Regestration Sucesful");
      navigate("/login");
    }
  }catch(err)
  {
console.log(err)
  }
  };

  return (
    <div className=" w-[700px] h-[500px] m-auto mt-7 shadow-lg shadow-slate-400 rounded flex">
      <div className="w-1/2 h-full  pt-11 px-8">
        <form method="POST">
          <div className="mt-11">
            <i className="fa-solid fa-user relative left-4"></i>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              name="name"
              className="w-11/12 pl-7 border-b border-0 focus:outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="my-6">
            <i className="fa-solid fa-envelope relative left-4"></i>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              name="email"
              className="w-11/12 pl-7 border-b border-0 focus:outline-none "
              onChange={handleChange}
            />
          </div>

          <div className="my-6">
            <i className="fa-solid fa-phone relative left-4"></i>
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              name="phone"
              className="w-11/12 pl-7 border-b border-0 focus:outline-none "
              onChange={handleChange}
            />
          </div>

          <div className="my-6">
            <i className="fa-solid fa-user-tie relative left-4"></i>
            <input
              type="text"
              placeholder="Your Profession"
              value={work}
              name="work"
              className="w-11/12 pl-7 border-b border-0 focus:outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="my-6">
            <i className="fa-solid fa-lock relative left-4"></i>
            <input
              type="text"
              placeholder="Your Password"
              value={password}
              name="password"
              className="w-11/12 pl-7 border-b border-0 focus:outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="my-6">
            <i className="fa-solid fa-lock relative left-4"></i>
            <input
              type="text"
              placeholder="Confirm Your Password"
              value={confirmPassword}
              name="confirmPassword"
              className="w-11/12 pl-7 border-b border-0 focus:outline-none "
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-600 outline-none border-none p-2 rounded text-white mt-2 ml-4 "
            value="Submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-1/2 h-full ">
        <img src="./images/alone.jpg " className="mt-28" />
      </div>
    </div>
  );
};

export default Signup;
