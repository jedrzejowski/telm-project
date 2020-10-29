import db from "../db";
import * as yup from "yup";
import {user_regex, uuid_regex} from "../../regex";
import {PersonelT} from "../../data/Personel";
import {ValidationError} from "yup";
import {ParameterError} from "../../lib/error";

const Personel = () => {
    return db<PersonelT>("personel")
};

export default Personel;

const schema = yup.string().matches(user_regex);

export async function getOnePersonelById(personel_id: string): Promise<PersonelT | null> {
    if (!uuid_regex.test(personel_id)) {
        throw new ParameterError(getOnePersonelById, 'personel_id', personel_id);
    }

    const [personel] = await Personel().where('personel_id', personel_id).limit(1);

    return personel ?? null;
}

export async function getOnePersonelByUsername(username: string): Promise<PersonelT | null> {

    const [personel] = await Personel().where('username', username).limit(1);

    return personel ?? null;
}