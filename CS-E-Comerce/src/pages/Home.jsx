import React from "react";
import CategoryList from "../component/CategoryList";
import BannerProduct from "../component/BannerProduct";
import HorizontalCardProduct from "../component/HorizontalCardProduct";
import VerticalCardProduct from "../component/VerticalCardProduct";

export const Home = () => {
  return (
    <div>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
};
