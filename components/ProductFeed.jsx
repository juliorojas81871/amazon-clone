import { Product } from "./index";

const ProductFeed = ({ productsWithRatings }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
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
      <div className="md:col-span-2 xl:col-span-2">
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
  );
};

export default ProductFeed;
