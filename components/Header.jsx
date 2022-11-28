import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { updateString } from "../slices/searchSlice";
import { useState } from "react";
import { Dropdown } from "./";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    dispatch(updateString(e.target.value));
  };

  const search = () => {
    dispatch(updateString(input));
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div className="ns:py-2 flex flex-grow items-center bg-amazon_blue p-1 outline-none ">
        {/* Top nav */}
        <div className="flex-shrink-1 mt-2 flex w-28 items-center xs:w-32">
          <Image
            src="/assets/amazon.png"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        {/* search */}
        <div className="hidden sm:flex relative items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 g-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e)}
          />
          <SearchIcon onClick={search} className="h-12 p-4" />
        </div>
        <div>
          {/* right */}
          <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            {session ? (
              <Dropdown />
            ) : (
              <div onClick={signIn} className="link">
                <p className="font-extrabold md:text-sm">Sign In</p>
              </div>
            )}

            <div className="link" onClick={() => router.push("/orders")}>
              <p>Returns</p>
              <p className="font-extrabold md:text-sm">& Orders</p>
            </div>
            {
              <div
                className="link relative flex items-center"
                onClick={() => router.push("/checkout")}
              >
                <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">
                  {items.length}
                </span>
                <ShoppingCartIcon className="h-10" />
                <p className="hidden md:inline mt-2 font-extrabold md:text-sm">
                  Basket
                </p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="bg-amazon_blue sm:hidden p-2">
        <div className="flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 g-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e)}
          />
          <SearchIcon onClick={search} className="h-12 p-4" />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex overflow-x-scroll small-scrollbar items-center space-x-5 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" /> All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link">Electronics</p>
        <p className="link">Food & Grocery</p>
        <p className="link">Prime</p>
        <p className="link">Buy Again</p>
        <p className="link">Shopper Toolkit</p>
        <p className="link">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
