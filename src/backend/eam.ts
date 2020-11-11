import express, {RequestHandler} from "express";
import {ValidationError} from "yup";
import {NotFoundError} from "../lib/error";

/**
 * Warstwa pośrednia do przechwytywania wyjątków z asynchronicznych funkcji express'a
 */
export default function (func: RequestHandler): RequestHandler {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {

            if (error instanceof ValidationError) {

                res.status(400);
                res.json({status: "error", error});
                return;
            }

            if (error instanceof NotFoundError) {
                res.status(404);
                res.json({status: "error", error: error.message});
                return;
            }

            res.status(500);
            res.json({status: "error", error});
            console.error(error);
        }
    }
}