import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbInit from "./config/init";
import AuthRoute from "./routes/authRoute";
import ProductCategoryRoute from "./routes/productCategoryRoute";
import ProductRoute from "./routes/productRoute";

dbInit();

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(AuthRoute);
app.use(ProductRoute);
app.use(ProductCategoryRoute);

const start = async (): Promise<void> => {
  try {
    app.listen(process.env.NODE_PORT, () => {
      console.log("Server started on port 5506");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
