import React ,{useState ,useEffect}from 'react'

const Home = () => {
  const{userName,setUserName}=useState('');
  const{show,setShow}=useState(true);
  const callContactPage = async () => {
    try {
      const res = await fetch("/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserName(data.name);
      console.log(data);
      setShow(true)
      
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

  return (
    <div className='mt-[200px]'>
<h1 className='text-3xl text-center'>Welcome</h1>
         <h1>{userName}</h1>
      <h1 className='text-3xl text-center'>{show?"happy to see you back":"We are The Mern stack Developer"}</h1>
      
     </div>
  )
}

export default Home