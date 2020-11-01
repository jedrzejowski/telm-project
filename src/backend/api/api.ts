import express from "express";
import patients from "./patients";

const api = express.Router();

api.use("/patients", patients)

export default api;
