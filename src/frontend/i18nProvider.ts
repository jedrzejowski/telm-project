import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";

const polishMessages = {
    ...require("ra-language-polish"),
    resources: {
        patients: {
            fields: {
                name1: "Nazwisko",
                name2: "Imię",
                name3: "Drugie imię",
                sex: "Płeć",
            }
        },
        hospitalizations: {
            name: 'Hospitalizacja |||| Hospitalizacje',
            list_title: 'Lista hospitalizacji',
            fields: {
                patient_id: 'Pacjent',
                time_start: 'Czas rozpoczęcia',
                time_end: 'Czas zakończenia',
            },
        }
    }
};

console.log(polishMessages);

const i18nProvider = polyglotI18nProvider(locale => {
    switch (locale) {
        case "pl":
            return polishMessages;
        default:
            return englishMessages;
    }
}, "pl");

export default i18nProvider;