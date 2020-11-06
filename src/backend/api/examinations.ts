import createQueryRouter from "../lib/createQueryRouter";
import {
    ExaminationFilterY,
    queryCreateExamination,
    querySelectExamination,
    querySelectExaminations,
    queryUpdateExamination
} from "../data/examinations";
import {ExaminationY} from "../../data/examinations";

const examinations = createQueryRouter("patients", {
    objectSchema: ExaminationY,
    filterSchema: ExaminationFilterY,
    querySelectOne: querySelectExamination,
    querySelectMany: querySelectExaminations,
    queryUpdate: queryUpdateExamination,
    queryCreate: queryCreateExamination
});

export default examinations;
