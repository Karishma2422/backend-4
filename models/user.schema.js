
import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role : {type : String , required : true , default : "user"},
    password: { type: String, required: true }, 
    phone: { type: Number, default: 9876543210 }
},{timestamps : true})

const User = model("Users", userSchema);

export default User;

// mongoose help node js to connect with mongoDB
// also used to run querry on mongoDB


// this is schema
 // steps are import model and schema from mongoose

//  create schema useing new Schema({
//     key : value
//  })

// create a variable User = model("name", schema)

// export default User;