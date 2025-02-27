import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function BayNow() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) {
      toast.info("Checking user details, please wait...");
      return;
    }

    if (!user?._id) {
      toast.error("Please log in to continue.");
      navigate("/login");
      return;
    }

    toast.success("Order is successful!");
    console.log("User ID:", user._id);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Payment Method
        </h2>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-gray-600 mb-2">
            Select Payment Category:
          </label>
          <select
            id="category"
            required
            className="p-2 border border-gray-300 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <p className="text-red-600 text-xs p-3">
            This product is only available for Cash on Delivery
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Checking..." : "Order Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BayNow;
