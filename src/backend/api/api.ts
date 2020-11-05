import express from "express";
import patients from "./patients";
import personel from "./personel";
import hospitalizations from "./hospitalizations";

const api = express.Router();

api.use("/patients", patients)
api.use("/personel", personel)
api.use("/hospitalizations", hospitalizations)

export default api;
