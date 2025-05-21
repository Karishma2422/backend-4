
import mongoose, { model, Schema } from "mongoose"

const cartSchema = new Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "Users"},
    productId : {type : [String]},
},{timestamps : true})


const Cart = model("Carts", cartSchema);
export default Cart






















