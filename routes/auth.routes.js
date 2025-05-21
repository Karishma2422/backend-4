
import { Router } from "express";
import { GetCurrentUser, Login, Register } from "../controllers/auth.controllers.js";

const AuthRoutes = Router();

AuthRoutes.post("/register", Register);
AuthRoutes.post("/login", Login)
AuthRoutes.post("/get-current-user", GetCurrentUser)

export default AuthRoutes;