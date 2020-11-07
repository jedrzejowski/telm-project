const fs = require("fs");
const os = require("os");
const Generator = require("./generator");

const Generatory = new Generator();

function genPatient() {

    let {year, month, day, sex, pesel} = Generatory.generujPESEL();
    let name3 = null;

    if (month > 12) {
        month = month - 20;
        year = year + 100;
    }

    if (month < 10) month = "0" + month;

    if (Math.random() > 0.5) {
        name3 = Generatory.generujImie();
    }

    return {
        name1: Generatory.generujImie(),
        name2: Generatory.generujNazwisko(),
        name3,
        date_of_birth: [year, month, day].join('-'),
        sex: sex % 2 ? 'F' : 'M',
        pesel,
    }
}

let lines = [];

for (let i = 0; i < 36; i++) {
    const pat = genPatient();
    lines.push([
        (pat.name1[0] + pat.name2).toLowerCase().replace(/[^\x00-\x7F]/g, ""),
        pat.name1,
        pat.name2,
        pat.name3,
        pat.pesel.substring(0, 7),
        // pat.sex,
        // pat.date_of_birth,
    ].join(','))
}

fs.writeFileSync("./data.csv", lines.join(os.EOL));
