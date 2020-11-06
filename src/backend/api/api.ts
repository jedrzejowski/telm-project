import express from "express";
import patients from "./patients";
import personel from "./personel";
import hospitalizations from "./hospitalizations";
import examinations from "./examinations";

const api = express.Router();

api.use("/patients", patients)
api.use("/personel", personel)
api.use("/hospitalizations", hospitalizations)
api.use("/examinations", examinations)

export default api;
