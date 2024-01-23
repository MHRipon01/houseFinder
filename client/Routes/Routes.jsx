import {
    createBrowserRouter, 
  } from "react-router-dom"; 
import Register from "../src/pages/Registration/Register";
import Login from "../src/pages/Login/Login";
import Home from "../src/pages/Home/Home";
import HouseOwner from "../src/pages/Dashboard/HouseOwner";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import Renter from "../src/pages/Dashboard/Renter";

  const router = createBrowserRouter([
    {
      path: "/",
      element:   <Home></Home>,
      children: [
        {}
      ]
    },
    {
        path: "/dashboard/:userRole",
        element: <Dashboard />,
        // children: [
        //   //for house owner 
        //   {
        //     path:'houseOwnerDashboard',
        //     element: <HouseOwner />
        //   },
        //   //for house renter
        //   {
        //     path: 'houseRenter',
        //     element: <Renter />
        //   }
       
        // ],
      }
      ,
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
    
  ]);

  export default router;