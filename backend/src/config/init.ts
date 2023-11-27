import User from "../models/User";
import ProductCategory from "../models/ProductCategory";
import Product from "../models/Product";

require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  User.sync({ alter: isDev });
  ProductCategory.sync({ alter: isDev });
  Product.sync({ alter: isDev });
};
export default dbInit;
