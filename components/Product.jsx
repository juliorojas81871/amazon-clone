import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { currencyFormat } from "../app/currencyFormat";

const Product = ({ id, title, price, description, category, image, rating, hasPrime }) => {
  return (
    <div className="relative z-40 mx-5 my-3 flex h-[96%] flex-col rounded-2xl border-none bg-white p-10 shadow-sm transition-all duration-150 ease-out hover:scale-105 hover:ease-in ">
      <p className="absolute top-2 right-3 text-base capitalize italic text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        height={200}
        width={200} 
        objectFit="contain"
      />

      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="my-2 text-xs line-clamp-2">{description}</p>
      <div className="mb-5 font-medium">
        <p>{currencyFormat(price)}</p>
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="/assets/prime.png" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default Product;
