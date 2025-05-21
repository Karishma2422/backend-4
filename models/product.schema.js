
import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
    name : {type : String, required : true},
    price : {type : Number, required : true},
    quantity : {type : Number, required : true},
    category : {type : String, required : true},
    image : {type : String , required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "Users"} 
},{timestamps : true})

// relation building with other schema 
//  here we are saying that userId has objectId from User schema  

const Product = model("Product", productSchema);

export default Product;