import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { currencyFormat } from "../app/currencyFormat";
const MAX_RATING = 5;
const MIN_RATING = 1;

function rating() {
  const [randomRating, setRandomRating] = useState(undefined);

  useEffect(() => {
    setRandomRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
  }, []);

  return randomRating;
}

function hasPrime() {
  const [randomHasPrime, setRandomHasPrimer] = useState(true);

  useEffect(() => {
    setRandomHasPrimer(Math.random() < 0.5);
  }, []);

  return randomHasPrime;
}

const Product = ({ id, title, price, description, category, image }) => {
  return (
    <div className="relative z-40 mx-5 my-3 flex h-[96%] flex-col rounded-2xl border-none bg-white p-10 shadow-sm transition-all duration-150 ease-out hover:scale-105 hover:ease-in">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        objectFit="contain"
        className="cursor-pointer overflow-hidden rounded-lg  transition-all duration-150 ease-out hover:ease-in "
        loading="lazy"
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating())
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div>
        <p>{currencyFormat(price)}</p>
      </div>
      {hasPrime() && (
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
