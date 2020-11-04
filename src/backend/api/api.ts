import express from "express";
import patients from "./patients";
import personel from "./personel";

const api = express.Router();

api.use("/patients", patients)
api.use("/personel", personel)

export default api;
