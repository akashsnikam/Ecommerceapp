import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../component/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category: filterCategoryList }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({ ...prev, [value]: checked }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(arrayOfCategory);
    const urlFormat = arrayOfCategory.map((el) => `category=${el}`).join("&&");
    navigate("/product-category?" + urlFormat);
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    setData((prev) =>
      [...prev].sort((a, b) =>
        value === "asc"
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-6">
        {/* Left Side: Product List */}
        <div>
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results: {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>

        {/* Right Side: Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Sort By */}
          <div className="mb-4">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                Price - Low to High
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                Price - High to Low
              </label>
            </form>
          </div>

          {/* Filter by Category */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <label key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectCategory[category.value]}
                    value={category.value}
                    onChange={handleSelectCategory}
                  />
                  {category.label}
                </label>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
