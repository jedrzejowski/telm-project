import {getOnePersonelById} from "./Personel";

describe('Personel', function () {
    it('getOnePersonel', async function () {

        console.log(await getOnePersonelById('9c9624d5-c3d6-4ae4-a6f8-72ee72628108'));
    });
});