import React from "react";
import { useState, useEffect } from "react";
const Contact = () => {
  const [state, setstate] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });

  const callContactPage = async () => {
    try {
      const res = await fetch("/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setstate({
        ...state,
        name: data.name,
        phone: data.phone,
        work: data.work,
        email: data.email,
      });
      if (res.status !== 200) {
        throw new Error("not valid");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);
  const { name, email, phone, msg } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  //send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, msg }),
      });
      const data = await res.json();
      console.log(data)
      if (!data) {
        console.log("failed");
        window.alert("failed");
      } else {
        console.log("msf sent");
        window.alert("msg sent");
        setstate({ ...state, msg: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form method="POST">
        <div className=" flex justify-between px-16 py-9">
          <div className="w-[300px] h-[60px] border shadow-lg shadow-black-500 px-9">
            <p>Phone number</p>
            <h4>8878552464</h4>
          </div>
          <div className="w-[300px] h-[60px] border shadow-lg shadow-black-500 px-9">
            <p>Email</p>
            <h4>sonu@gmail.com</h4>
          </div>

          <div className="w-[300px] h-[60px] border shadow-lg shadow-black-500 px-9">
            <p>Address</p>
            <h4>Btm layout,Banglore</h4>
          </div>
        </div>
        <div className="w-[700px] h-[400px] border border-red-800  m-auto  px-7 shadow-lg shadow-slate-600 pt-7">
          <div className="flex">
            <div className="">
              <input
                type="text"
                placeholder="Your Name"
                className="p-2 border focus:outline-none"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 border focus:outline-none"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="">
              <input
                type="number"
                placeholder="Your Phone Number"
                className="p-2 border focus:outline-none"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <textarea
            className="w-[600px] h-[250px] border  mt-5  focus:outline-none"
            name="msg"
            value={msg}
            onChange={handleChange}
          />
          <button
            type="submit"
            placeholder="Your Message"
            className="bg-cyan-600 outline-none border-none p-2 rounded text-white mt-2 ml-4 "
            value="Submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
