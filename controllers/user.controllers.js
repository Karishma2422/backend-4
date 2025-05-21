
import Cart from "../models/cart.schema.js";
import Product from "../models/product.schema.js";
import User from "../models/user.schema.js";

export const addToCart = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { userId } = req.body;
    console.log(userId, "userId");

    if (!userId) {
      return res.json({ success: false, message: "User Id not found!" });
    }
    const { productId } = req.body;

    console.log(productId, "productId");

    if (!productId) {
      return res.json({ success: false, message: "Product Id not found!" });
    }

    const isUserExist = await User.findById(userId);

    console.log(isUserExist, "isUserExist");

    if (!isUserExist) {
      return res.json({ success: false, message: "User not found!" });
    }

    const isProductExist = await Product.findById(productId);

    console.log(isProductExist, "isProductExist");
    if (!isProductExist) {
      return res.json({ success: false, message: "Product not found!:" });
    }


    const newCarProduct = new Cart({
        userId : userId,
        productId : [productId]
    })

    await newCarProduct.save();

    console.log(newCarProduct, "newCarProduct");    

    return res.json({ success : true , message : "Product addded to the cart!" , cart : newCarProduct});
  } catch (error) {
    return res.send("Error while user api :", error);
  }
};
