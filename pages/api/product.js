import products from "../../data/product.json";

export default async (req, res) => {
    res.send(products);
};