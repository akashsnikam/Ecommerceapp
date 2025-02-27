import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto ">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/***view product */}

        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white my-3 border border-gray-300 shadow-md rounded-lg p-4 flex items-center gap-4"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-slate-200 flex-shrink-0">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-800 line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-sm text-gray-500 capitalize">
                      {product?.productId.category}
                    </p>

                    {/* Pricing and Quantity Controls */}
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-2">
                      <p className="text-red-600 font-semibold text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-gray-700 font-semibold text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 flex justify-center items-center rounded-md"
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {product?.quantity}
                      </span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-8 h-8 flex justify-center items-center rounded-md"
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div
                    className="text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete size={24} />
                  </div>
                </div>
              ))}
        </div>

        {/***summary  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <Link to={"/payment"}>
                <button className="bg-blue-600 p-2 text-white w-full mt-2 cursor-pointer">
                  Bay Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
