// import { useContext } from "react";
// import HouseOwner from "./HouseOwner";
// import AuthContext from "../../AuthProvider/AuthContext";
// import Renter from "./Renter";
// import { Outlet } from "react-router-dom";

// const Dashboard = () => {
//   const { userData } = useContext(AuthContext);
//   console.log(userData);
//   return (
//     <div>
//       <div className="lg:flex max-w-7xl mx-auto gap-3">
//         <div className="mt-5 py-5 lg:w-64 md:min-h-screen bg-gray-300">
//           {userData?.role == "house_renter" && <Renter />}
//           {userData?.role == "house_owner" && <HouseOwner />}
//         </div>
        
    
//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import { IoCart } from "react-icons/io5";
 
import { NavLink, Outlet } from "react-router-dom";
import AuthContext from "../../AuthProvider/AuthContext";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const { userData } = useContext(AuthContext);

  console.log(userData);

    useEffect(() => {
      setUser(userData);
    }, [userData]);

  console.log(user);
  return (
    <div className="lg:flex max-w-7xl mx-auto gap-3">
      <div className="mt-5 py-5 lg:w-64 md:min-h-screen bg-gray-300">
        {/* _________________________________________ */}
        {/* For renter */}

        {user?.role == "house_renter" && (
          <>
            {" "}
            <ul className="mx-auto my-3 py-2 border-2 w-4/5 hover:border-purple-300 bg-blue-200 rounded-lg text-center">
              <NavLink to="/">
                <div className="flex gap-3 items-center justify-center">
                  <svg
                    className="w-7 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Home
                </div>
              </NavLink>
            </ul>
            <ul className="mx-auto my-3 py-2 border-2 w-4/5 hover:border-purple-300 bg-blue-200 rounded-lg text-center">
              <NavLink to="/cart">
                <div className="flex gap-3 items-center justify-center">
                  <IoCart className="text-3xl" />
                  Cart
                </div>
              </NavLink>
            </ul>
            <ul className="mx-auto my-3 py-2 border-2 hover:border-purple-300 w-4/5 bg-blue-200 rounded-lg text-center">
              <NavLink to="/dashboard/orderedProducts">
                <div className="flex gap-3 items-center justify-center">
                  <svg
                    className="w-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  My Orders
                </div>
              </NavLink>
            </ul>
            <ul className="mx-auto my-3 py-2 border-2 w-4/5 hover:border-purple-300 bg-blue-200 rounded-lg text-center">
              <NavLink to="/dashboard/sellerRequest">
                <div className="flex gap-3 items-center justify-center">
                  <img
                    className="w-8 text-purple-500"
                    src="/src/assets/target.png"
                    alt=""
                  />
                  Seller Requests
                </div>
              </NavLink>
            </ul>
            <ul className="mx-auto my-3 py-2 border-2 w-4/5 hover:border-purple-300 bg-blue-200 rounded-lg text-center">
              <NavLink to="/dashboard/deliveryRequest">
                <div className="flex gap-3 items-center justify-center">
                  <img
                    className="max-w-[40px]"
                    src="/src/assets/delivery-man.png"
                    alt=""
                  />
                  Delivery Man
                </div>
              </NavLink>
            </ul>
          </>
        )}

        
        {/* ______________________________________________________ */}

        {/* For owner */}
        {user?.role == "house_owner" && (
          <div className="">
            <ul className="mx-auto my-3 py-2 border-2 w-1/2 hover:border-purple-300 bg-blue-200 rounded-lg text-center">
              <NavLink to="/">
                <div className="flex gap-3 items-center justify-center">
                  <svg
                    className="w-7 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Home
                </div>
              </NavLink>
            </ul>

            <ul className="mx-auto my-3 py-2 border-2 hover:border-purple-300 w-1/2 bg-blue-200 rounded-lg text-center">
              <NavLink to="/dashboard/orderedProducts">
                <div className="flex gap-3 items-center justify-center">
                  <svg
                    className="w-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  My Orders
                </div>
              </NavLink>
            </ul>

            <ul className="mx-auto my-3 py-2 border-2 w-1/2 hover:border-purple-300 bg-blue-200 rounded-lg text-center">
              <NavLink to="/dashboard/profile">
                <div className="flex gap-3 items-center justify-center">
                  <svg
                    className="w-7 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.841 15.659L18.017 15.836L18.1945 15.659C19.0732 14.7803 20.4978 14.7803 21.3765 15.659C22.2552 16.5377 22.2552 17.9623 21.3765 18.841L18.0178 22.1997L14.659 18.841C13.7803 17.9623 13.7803 16.5377 14.659 15.659C15.5377 14.7803 16.9623 14.7803 17.841 15.659ZM12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.6651 7.44784 14.1355 11.7508 14.0038L12 14ZM12 1C15.315 1 18 3.685 18 7C18 10.2397 15.4357 12.8776 12.225 12.9959L12 13C8.685 13 6 10.315 6 7C6 3.76034 8.56434 1.12237 11.775 1.00414L12 1ZM12 3C9.78957 3 8 4.78957 8 7C8 9.21043 9.78957 11 12 11C14.2104 11 16 9.21043 16 7C16 4.78957 14.2104 3 12 3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Profile
                </div>
              </NavLink>
            </ul>
          </div>
        )}
 
      </div>

      {/* dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
