 
import { NavLink, useNavigate } from "react-router-dom";  
import useAxiosPublic from "../hooks/useAxiosPublic";
import AuthContext from "../AuthProvider/AuthContext";
import { useContext, useState } from "react";

const Navbar = () => {
 
    const { info } = useContext(AuthContext);
    const { userData, logout } = info;
      const navigate = useNavigate();
      const axiosPublic = useAxiosPublic()
  const [userRole , setUserRole] = useState()
  
    const user =localStorage.getItem('email')
      const handleLogout = () => {
          // Remove the token from local storage
          logout();
          
          
          localStorage.removeItem('token');
          localStorage.removeItem('email')
     
          window.reload()
          alert('logged out ')
          // Redirect to the login page or any other desired action
        //   navigate("/login");
        };
        
        const email=localStorage.getItem('email')
        console.log(email);

        const res = axiosPublic.get(`/user/${email}`)
        .then(response => {
          console.log(response.data);
          setUserRole(response.data.role)
          
        })
  const navLinks = (
    <>
      <NavLink
        to="/"
        className="text-2xl font-Cormorant font-medium rounded-xl p-3"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            backgroundColor: isActive ? "#e8dfcf" : "",
          };
        }}
      >
        Home
      </NavLink>

      <NavLink
        className="text-2xl font-Cormorant  font-medium rounded-xl p-3"
        to={`/dashboard/${userRole}`}
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            backgroundColor: isActive ? "#e8dfcf" : "",
          };
        }}
      >
        Dashboard
      </NavLink>
      <NavLink
        className="text-2xl font-Cormorant font-medium rounded-xl p-3"
        to="/contact"
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            backgroundColor: isActive ? "#e8dfcf" : "",
          };
        }}
      >
        Reservation
      </NavLink>
    </>
  );

  return (
    <div className="max-w-full md:max-w-full">
      <div className="navbar bg-neutral-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <h3
            id="logoName"
            className="border-2 border-blue-400  text-3xl font-bold text-[#e8b67d]  my-4"
          >
            House finder{" "}
          </h3>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end md:flex justify-center items-center text-center ">
          
          {user ? (
            <>
         
             
             <div className="md:flex justify-center items-center ">
             <div className="text-lg font-bold font-Cormorant">{user.displayName}</div>
              <div>
              <button className="btn font-Cormorant font-bold" 
              onClick={handleLogout}>Sign Out
             </button>
              </div>
             </div>
            </>
          ) : (
            <div>
              <NavLink
                className="text-2xl font-Cormorant rounded-xl p-3"
                to="/login"
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    backgroundColor: isActive ? "pink" : "",
                  };
                }}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
