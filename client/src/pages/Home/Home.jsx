import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthProvider/AuthContext";
import Navbar from "../../components/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic";

 

const Home = () => {
  const { info } = useContext(AuthContext);
  const { userData, logout } = info;
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()
const [houses , setHouses] = useState([])

    // const handleLogout = () => {
    //     // Remove the token from local storage
    //     logout();
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('email')
    //     // Redirect to the login page or any other desired action
    //     navigate("/login");
    //   };
      



  useEffect(() => {
    axiosPublic.get('/houses')
      .then(response => {
        console.log(response.data);
        setHouses(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [axiosPublic]); // Add axiosPublic as a dependency


    return (
      <div className=" ">
         
      <Navbar></Navbar>
     <div className="">
     {
  houses && (
    <div className="grid grid-cols-3 gap-4">
      {houses.map(house => (
        <div key={house._id} className="card w-full from-white to-white bg-gradient-to-tl hover:from-[#d6b48c] hover:to-[#f0e0ce] transition-all duration-1000 shadow-2xl mt-11">
          <figure className="p-3">
            <img src={house?.imageUrl} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 id='' className="card-title font-Crimson text-3xl font-bold">{house?.availability}</h2>
            <p className='text-xl font-medium'>{house?.city}</p>
            <div className="flex gap-3">
              <p>{house?.bedrooms} bedrooms</p>
              <p>{house?.bathrooms} bathrooms</p>
         
            </div>
            <p className='text-xl font-medium'>Rent : $ {house?.rentPerMonth}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

     </div>
     

     

      </div>
     
    );
  };

export default Home;