import moment from "moment";
import { currencyFormat } from "../app/currencyFormat";

const Order = ({ id, amount, amountShipping, items, timestamp, images }) => {
  const imagesParse = JSON.parse(images);
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 bg-gray-100 text-sm text-gray-600 p-5">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            {currencyFormat(amount)} - Next Day Delivery{" "}
            {currencyFormat(amountShipping)}
          </p>
        </div>

        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto small-scrollbar">
          {imagesParse.slice(1, imagesParse.length).map((image) => (
            <div className="relative flex items-center " key={image}>
                
              <p className="absolute bottom-0 text-xs right-0 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">{image[0]}</p>
              <img
                  src={`https://fakestoreapi.com/img/${image[1]}`}
                  alt=""
                  className="h-20 object-contain sm:h-32"
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
