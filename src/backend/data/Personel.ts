import database from "../database";
import {username_yup, uuid_yup} from "../../regex";
import {PersonelT} from "../../data/personel";

const Personel = () => {
    return database<PersonelT>("personel")
};

export default Personel;

export async function getOnePersonelById(personel_id: string): Promise<PersonelT | null> {
    personel_id = await uuid_yup.validate(personel_id);

    const [personel] = await Personel().where('personel_id', personel_id).limit(1);

    return personel ?? null;
}

export async function getOnePersonelByUsername(username: string): Promise<PersonelT | null> {
    username = await username_yup.validate(username);

    const [personel] = await Personel().where('username', username).limit(1);

    return personel ?? null;
}