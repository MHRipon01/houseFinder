import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import AuthContext from "../../AuthProvider/AuthContext";

const Register = () => {
  const [rol, setRole] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    info: { updateUserData },
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const number = form.get("number");
    const phoneNumber = "+" + 880 + number;
    const role = form.get("role");
    const password = form.get("password");
    const email = form.get("email");

    let toastId;

    if (!name || !email) {
      toastId = toast.error("Invalid input...");
      console.log(toastId);
    }

    try {
      const userInfo = {
        name: name,
        email: email,
        role: rol,
        password: password,
        phone: phoneNumber,
      };

      console.log(userInfo);

      const response = await axiosPublic.post("/register", userInfo);

      if (response.data.status === 409) {
        toast.error(response.data.message);
      } else if (response.data.status === 201) {
        // Registration successful
        toast.success("Registration Completed");
        console.log(response.data.usersData);

        // Update the user data in the context, including the role
        updateUserData({ ...response.data.usersData, role: rol });
        console.log(response.data.usersData);
        localStorage.setItem("token", response.data.token);

        if (rol === "house_owner") {
          navigate("/dashboard/houseOwnerDashboard");
        }
        if (rol === "house_renter") {
          navigate("/dashboard/houseRenter");
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your profile info updated",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-200 h-full lg:h-[100vh]   from-gray-200 to-blue-gray-700 flex justify-center items-center">
      <div className=" border-2 my-auto py-16   border-blue-600 shadow-2xl hover:shadow-[#92e1f6] mx-auto rounded-xl bg-clip-border      ">
        <form onSubmit={handleRegister}>
          <div className="lg:min-w-[500px] w-full h-full mx-auto   ">
            <div className="relative  w-full lg:h-2/3   flex flex-col text-gray-700 bg-transparent bg-blend-color-burn ">
              <div className="relative  grid mx-4 mb-4  overflow-hidden text-black shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-blue-500 to-[#92e1f6] bg-clip-border hover:shadow-[#92e1f6]">
                <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-black">
                  Register
                </h3>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    name="name"
                    className="w-full  h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-black border-t-transparent text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all  before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Name
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-6">
                <div className="relative flex  h-11 w-full min-w-[200px]">
                  {/* <input type="number" /> */}

                  <div>
                    <h4 className="border-2 border-black rounded-lg p-3 flex items-center h-full mr-4">
                      +880
                    </h4>
                  </div>

                  <input
                    name="number"
                    type="tel"
                    maxLength={10}
                    minLength={10}
                    className="w-full  h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-black border-t-transparent text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                    placeholder=" Phone Number"
                  />
                </div>

                {/* role */}
                <select
                  className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-black border-t-transparent text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                  required
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option name="role" value="" selected disabled>
                    Select role
                  </option>
                  <option value="house_owner">House Owner</option>
                  <option value="house_renter">House Renter</option>
                </select>

                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    name="email"
                    className="w-full  h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-black border-t-transparent text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    name="password"
                    type="password"
                    className="w-full  h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-black border-t-transparent text-black outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>

              <div className="p-6 pt-6">
                <button
                  type="submit"
                  className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-500 to-[#92e1f6] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md   transition-all hover:shadow-lg hover:shadow-[#92e1f6] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                >
                  Register
                </button>
                <p className="flex justify-center mt-6 font-sans text-xl antialiased font-light leading-normal text-inherit">
                  Already have an account?
                  <Link to="/login">
                    <button className="block ml-1 font-sans text-xl antialiased font-bold leading-normal text-blue-500">
                      Login
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
