import React from "react";
import loginicon from "../assets/signin.gif";
import { Await, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    profilepic: "",
  });

  const navigate = useNavigate();

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilepic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmpassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast(dataApi.message);
      }
    } else {
      toast(dataApi.message);
      console.log("plese check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container px-4">
        <div className="bg-white p-2 py-7 w-full  max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full ">
            <div>
              <img src={data.profilepic || loginicon} alt="login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 pb-4 pt-1 cursor-pointer bg-slate-200 text-center text-center  absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                ></input>
              </label>
            </form>
          </div>

          <form onSubmit={handleSubmit} class="max-w-sm mx-auto pt-6">
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Enter Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleonChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ABC"
                required
              />
            </div>

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

            <div class="mb-5">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Enter Your Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={data.confirmpassword}
                onChange={handleonChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mx-auto block cursor-pointer"
            >
              Sighn Up
            </button>

            <div>
              <p className="p-1 py-3 w-full  max-w-md mx-auto my-1 ">
                Already have account ?{" "}
                <Link
                  to={"/login"}
                  className="hover:underline hover:text-red-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
