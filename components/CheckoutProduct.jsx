import Image from "next/image";
import { StarIcon, MinusSmIcon, PlusIcon } from "@heroicons/react/solid";
import { currencyFormat } from "../app/currencyFormat";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  removeGroupedFromBasket,
} from "../slices/basketSlice";
import { TrashIcon } from "@heroicons/react/outline";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  quantity,
}) => {
  const total = quantity * price;
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    // add to REDUX store
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
    toast.success(
      <div>
        <p className="font-semibold">Product Increased</p>
        <p className="text-xs text-gray-400 line-clamp-1"> {title}</p>
      </div>,
      {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  };

  const removeItemFromBasket = () => {
    // remove a single item from REDUX store
    dispatch(removeFromBasket({ id }));
    toast.success(
      <div>
        <p className="font-semibold">Product Decreased</p>
        <p className="text-xs text-gray-400 line-clamp-1"> {title}</p>
      </div>,
      {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  };

  const removeGroupFromBasket = () => {
    const product = {
      id,
      title,
    };
    //remove product as an action from the REDUX store
    dispatch(removeGroupedFromBasket({ id }));
    toast.success(
      <div>
        <p className="font-semibold">Product Removed Successfully</p>
        <p className="text-xs text-gray-400 line-clamp-1"> {title}</p>
      </div>,
      {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  };
  return (
    <>
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <div className="border-b py-4">
      <div className="grid grid-cols-5">
        <Image src={image} height={200} width={200} objectFit="contain" />

        {/* middle */}
        <div className="col-span-4 mx-5 sm:col-span-3">
          <p>{title}</p>
          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="my-2 text-xs line-clamp-3">{description}</p>
          <a className="text-xl font-bold text-gray-800">{quantity}</a> x{" "}
          <a className="text-xl font-bold text-gray-800">
            {currencyFormat(price)}
          </a>
          <span className="text-xl font-bold text-gray-800">
            = {currencyFormat(total)}
          </span>
          {hasPrime && (
            <div className="flex items-center space-x-2">
              <img className="w-12" src="/assets/prime.png" alt="" />
              <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
            </div>
          )}
        </div>
        <div className="-mr-2 hidden flex-col space-y-2 justify-self-end sm:flex">
          <div className="flex items-center justify-center space-x-3 ">
            <button className=" button mt-6 " onClick={removeItemFromBasket}>
              <MinusSmIcon className="h-4 md:h-6" />
            </button>
            <p className="mt-5 text-2xl font-bold">{quantity}</p>
            <button className=" button mt-6 " onClick={addItemToBasket}>
              <PlusIcon className="h-4 md:h-6" />
            </button>
          </div>
          <button
            className=" button mt-6 flex items-center justify-center"
            onClick={removeGroupFromBasket}
          >
            <TrashIcon className="h-8 w-8" />
            <a className="ml-2 text-base font-semibold">Remove </a>
          </button>
        </div>
      </div>
      <div className="-mr-2 flex flex-col space-y-2 justify-self-end sm:hidden">
        <div className="flex items-center justify-center space-x-3 ">
          <button className=" button mt-6 " onClick={removeItemFromBasket}>
            <MinusSmIcon className="h-4 md:h-6" />
          </button>
          <p className="mt-5 text-2xl font-bold">{quantity}</p>
          <button className=" button mt-6 " onClick={addItemToBasket}>
            <PlusIcon className="h-4 md:h-6" />
          </button>
        </div>
        <button
          className=" button mt-6 flex items-center justify-center"
          onClick={removeGroupFromBasket}
        >
          <TrashIcon className="h-5 w-5" />
          <a className="mt-[1.5px] ml-2 text-base font-semibold">
            Remove From Basket
          </a>
        </button>
      </div>
    </div>
    </>
  );
};

export default CheckoutProduct;
