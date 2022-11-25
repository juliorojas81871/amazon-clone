import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { currencyFormat } from "../app/currencyFormat";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductInfo({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    // sending the product as an action to the REDUX store ... the basket slice
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  const notify = () => {
    const product = {
      id,
      title,
    };
    toast.success(
      <div>
        <p className="font-semibold">Product Added Successfully !!</p>
        <p className="text-xs text-gray-400 line-clamp-1"> {product.title}</p>
      </div>,
      {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="flex flex-col mx-20 mt-8 items-center bg-white shadow-md p-5 rounded-md w-screen">
      <Image
        src={image || placeholderProductImg}
        height={200}
        width={200}
        objectFit="contain"
      />

      <div className="h-5" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="h-2" />

        <div className="flex">
          {Array(Number(rating))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 ">{description}</p>

        <p>{currencyFormat(price)}</p>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img src="/assets/prime.png" className="w-12" loading="lazy" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto">
        <button
          className="button w-52"
          onClick={() => {
            addItemToBasket(), notify();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
