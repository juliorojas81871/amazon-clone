import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) => {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    // sending the product as an action to the REDUX store ... the basket slice
    dispatch(
      addToBasket({
        id,
        title,
        price,
        rating,
        description,
        category,
        image,
        hasPrime,
      })
    );
  };

  const notify = () => {
    const product = {
      id,
      title,
    }
    toast.success(
      <div>
        <p className="font-semibold">Product Added Successfully !!</p>
        <p className="text-xs text-gray-400 line-clamp-1"> {product.title}</p>
      </div>,
      {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  }
  return (
    <div className="relative z-40 mx-5 my-3 flex h-[96%] flex-col rounded-2xl border-none bg-white p-10 shadow-sm transition-all duration-150 ease-out hover:scale-105 hover:ease-in ">
      <p className="absolute top-2 right-3 text-base capitalize italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

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
        <Currency quantity={price} currency="USD" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="/assets/prime.png" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button 
        onClick={() =>  {
          addItemToBasket(),
          notify()
        }} 
        className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
