import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDispaly, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();

  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-3 justify-between gap-2">
        <div className="bg-gray-700 justfy-center rounded-full">
          <Link to={"/"}>
            <Logo w={80} h={40}></Logo>
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relativ group flex justify-center">
            {user?._id && (
              <div
                className="text-2xl cursor-pointer relative flex justify-center min-w-full "
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilepic ? (
                  <img
                    src={user?.profilepic}
                    className="w-8 h-8 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>
            )}

            {menuDispaly && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      className="whitespace-nowrahidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"}>
              <div className="text-2xl cursor-pointer relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm ">{context?.cartProductCount}</p>
                </div>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-800 cursor-pointer">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
