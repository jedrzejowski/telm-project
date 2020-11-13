import {useLocale} from "react-admin";
import dayjs from "dayjs";
import {nullStr} from "../components/lib/NullValue";

export default function () {
    const locale = useLocale();

    return (date: dayjs.ConfigType | null, format: string) => {
        if (date === null) {
            return nullStr;
        }
        return dayjs(date).locale(locale).format(format);
    }
}