const dotenv = require("dotenv");
dotenv.config()
const inforouter = require("./routes/infoRouter.js");
const userrouter = require("./routes/userRouter.js");
const categoryrouter = require("./routes/categoryRouter.js")
const attributerouter = require("./routes/attributeRouter.js")
const productrouter = require("./routes/productRouter.js")
const cartrouter = require("./routes/cartRouter.js")
const bannerrouter = require("./routes/bannerRouter.js")
const variantrouter = require("./routes/variantRouter.js")
const wishlistrouter = require("./routes/wishlistRouter.js")
const carousellistrouter = require("./routes/carousellistRouter.js")
const brandrouter = require("./routes/brandRouter.js")
const addressrouter = require("./routes/addressRouter.js")
const orderrouter = require("./routes/orderRouter.js")
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const path = require('path');
app.use(cors())
const connectdb = require("./db/connection.js");
require("./Models/contactus");
require("./Models/category");
require("./Models/attribute");
require("./Models/product");
require("./Models/product_variant");
require("./Models/usertable");
require("./Models/wishlist");
require("./Models/brand");
require("./Models/address");
require("./Models/order");
const port = process.env.PORT || 8000;
const database = process.env.database || "mongodb+srv://azy6049:as1816444@cluster0.hxfuyyu.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
connectdb(database);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", inforouter);
app.use("/api/user", userrouter);
app.use("/api/product",productrouter);
app.use("/api/category", categoryrouter);
app.use("/api/attribute", attributerouter);
app.use("/api/banner", bannerrouter);
app.use("/api/cart", cartrouter);
app.use("/api/wishlist", wishlistrouter);
app.use("/api/variant", variantrouter);
app.use("/api/list",carousellistrouter);
app.use("/api/brand",brandrouter);
app.use("/api/address",addressrouter);
app.use("/api/order",orderrouter);

app.listen(port, () => {
  console.log(`server is runing at ${port}`);
});
