import express from "express";

import {ObjectSchema, ObjectSchemaDefinition} from "yup";
import {AppQueryFilter, AppQueryResult} from "../../lib/query";
import eam from "../eam";
import createQueryFilterY from "./createQueryFilterY";

export default function <FullObj extends object, ShortObj extends object, Filter extends object>(name: string, opt: {
    fullObjValidate: ObjectSchema<FullObj>,
    shortObjValidate: ObjectSchema<ShortObj>,
    filterValidate: ObjectSchemaDefinition<Filter>,
    querySelectOne: (id: string) => Promise<FullObj | null>,
    querySelectMany: (query: AppQueryFilter<Filter>) => Promise<AppQueryResult<ShortObj>>,
    queryUpdate?: (id: string, obj: FullObj) => Promise<FullObj>,
    queryCreate?: (obj: FullObj) => Promise<[id: string, obj: FullObj]>,
}) {
    const router = express.Router();

    const {
        fullObjValidate,
        querySelectMany,
        querySelectOne,
        filterValidate,
        queryUpdate,
        queryCreate
    } = opt;

    const queryFilterY = createQueryFilterY<Filter>(filterValidate);

    router.get("/", eam(async (req, res) => {
        const query = await queryFilterY.validate(req.query);
        const result = await querySelectMany(query);

        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Range', `posts ${query.offset}-${query.offset + result.rows.length - 1}/${result.totalCount}`);


        res.send(result.rows);
    }));

    router.get("/:id", eam(async (req, res) => {
        const id = req.params.id as string;

        const row = await querySelectOne(id);

        if (!row) {
            res.status(404).send({status: "error", error: "not found"});
        } else {
            res.status(200).send(row);
        }
    }));

    queryUpdate && router.put("/:id", eam(async (req, res) => {
        const id = req.params.id as string;
        let obj = await fullObjValidate.validate(req.body);
        obj = await queryUpdate(id, obj);

        res.status(200).send(obj);
    }));

    queryCreate && router.post("/", eam(async (req, res) => {
        let obj = await fullObjValidate.validate(req.body), id: string;

        [id, obj] = await queryCreate(obj);

        res.status(200).send(obj);
    }));


    return router;
}