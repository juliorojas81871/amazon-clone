import { Product } from "./index";
import { ToastContainer } from "react-toastify";
import { searchString } from "../slices/searchSlice";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";

const ProductFeed = ({ productsWithRatings }) => {
  const string = useSelector(searchString);

  const fuse = new Fuse(productsWithRatings, {
    keys: ["title"],
    includeScore: true,
  });

  const results = fuse.search(!string ? " " : string);

  if (!string || !results) {
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
        <div
          leaveanimation="none"
          className="relative z-30 mx-auto grid max-w-screen-2xl grid-flow-row-dense rounded-md border-none shadow-md md:-mt-36 md:grid-cols-2 lg:-mt-52 lg:grid-cols-3 xl:grid-cols-4"
        >
          {productsWithRatings
            .slice(0, 4)
            .map(
              ({
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                hasPrime,
              }) => (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating}
                  hasPrime={hasPrime}
                />
              )
            )}
          <img
            className="my-2 mx-3.5 md:col-span-full"
            src="/assets/advertisement.jpg"
            alt=""
          />
          <div className="md:col-span-2">
            {productsWithRatings
              .slice(4, 5)
              .map(
                ({
                  id,
                  title,
                  price,
                  description,
                  category,
                  image,
                  rating,
                  hasPrime,
                }) => (
                  <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating}
                    hasPrime={hasPrime}
                  />
                )
              )}
          </div>
          {productsWithRatings
            .slice(5, productsWithRatings.length)
            .map(
              ({
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                hasPrime,
              }) => (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating}
                  hasPrime={hasPrime}
                />
              )
            )}
        </div>
      </>
    );
  } else {
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
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
          {results.slice(0, 4).map(({ item, score }, i) => (
            <>
              <Product
                category={item.category}
                image={item.image}
                title={item.title}
                description={item.description}
                key={item.id}
                id={item.id}
                price={item.price}
                i={i + 5}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            </>
          ))}
          <img
            className="my-2 mx-3.5 md:col-span-full"
            src="/assets/advertisement.jpg"
            alt=""
          />
          <div className="md:col-span-2 xl:col-span-2">
            {results.length > 4 && (
              <>
                {results.slice(4, 5).map(({ item, score }, i) => (
                  <>
                    <Product
                      category={item.category}
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      key={item.id}
                      id={item.id}
                      price={item.price}
                      i={i + 5}
                      rating={item.rating}
                      hasPrime={item.hasPrime}
                    />
                  </>
                ))}
              </>
            )}
          </div>
          {results.length > 5 && (
            <>
              {results.slice(5, productsWithRatings.length).map(({ item, score }, i) => (
                <>
                  <Product
                    category={item.category}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    key={item.id}
                    id={item.id}
                    price={item.price}
                    i={i + 5}
                    rating={item.rating}
                    hasPrime={item.hasPrime}
                  />
                </>
              ))}
            </>
          )}
        </div>
      </>
    );
  }
};

export default ProductFeed;
