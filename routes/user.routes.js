
import { Router } from "express";
import { addToCart } from "../controllers/user.controllers.js";

const UserRoutes = Router();

UserRoutes.post("/add-to-cart", addToCart)

export default UserRoutes;