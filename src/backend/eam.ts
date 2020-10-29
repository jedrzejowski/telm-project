import express from "express";
import {ValidationError} from "yup";
import {NotFoundError} from "../lib/error";

/**
 * Warstwa pośrednia do przechwytywania wyjątków z asynchronicznych funkcji express'a
 */
export default function (
    func: (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => void
) {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await func(req, res, next);
        } catch (error) {

            if (error instanceof ValidationError) {

                res.status(400);
                res.json({error});
                return;
            }

            if (error instanceof NotFoundError) {
                res.status(404);
                res.json({error: error.message});
                return;
            }

            res.status(500);
            res.json({error});
            console.error(error);
        }
    }
}