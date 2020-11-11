import {RequestHandler} from "express";
import {knex} from "./postgresql";

// https://stackoverflow.com/questions/19215042/express-logging-response-body

const logReqRes: RequestHandler = (req, res, next) => {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks: Buffer[] = [];

    res.write = (...restArgs: any[]) => {
        if (restArgs[0] instanceof Buffer) {
            chunks.push(restArgs[0]);
        } else {
            chunks.push(Buffer.from(restArgs[0]));
        }

        return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs: any[]) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }

        const body = Buffer.concat(chunks).toString('utf8')

        knex("logs").insert({
            timestamp: new Date().toUTCString(),
            ip: req.ip,
            headers: req.headers,
            method: req.method,
            url: req.originalUrl,
            request_data: req.body,
            response_data: body,
        }).then().catch(console.error);

        return oldEnd.apply(res, restArgs);
    };

    next();
}

export default logReqRes;
