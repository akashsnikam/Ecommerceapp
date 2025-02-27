import React, { useContext, useState } from "react";
import loginicon from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  console.log("data login,", data);

  return (
    <section id="login">
      <div className="mx-auto container px-4">
        <div className="bg-white p-2 py-7 w-full  max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginicon} alt="login icon" />
          </div>

          <form onSubmit={handleSubmit} class="max-w-sm mx-auto pt-6">
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Enter Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleonChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Enter Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleonChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="">
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600 "
              >
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mx-auto block cursor-pointer"
            >
              Login
            </button>

            <div>
              <p className="p-1 py-3 w-full  max-w-md mx-auto my-1 ">
                Dont't have account ?{" "}
                <Link
                  to={"/sign-up"}
                  className="hover:underline hover:text-red-600"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Login;
