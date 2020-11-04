import React from "react";
import MaterialTable, {MaterialTableProps} from "material-table";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";
import {materialTableLocalization, materialTableWrapFetch} from "../../lib/materialTable";
import {fetchSelectPatients} from "../../data/patients";
import {PatientShortT} from "../../../data/patient";

export default function PatientList(props: {
    padding?: "default" | "dense"
    editBtn?: boolean
}) {
    const {
        padding = "default",
        editBtn = true
    } = props;

    const history = useHistory();
    const table_ref = React.useRef<MaterialTableProps<any>>();

    return <MaterialTable<PatientShortT>
        components={{
            Container: Box
        }}
        tableRef={table_ref}
        title="Lista poświadczeń"
        localization={materialTableLocalization}
        columns={[{
            title: "Pesel",
            field: "pesel",
            type: "string",
        }, {
            title: "Nazwisko",
            field: "name1",
            type: "string"
        }, {
            title: "Imię",
            field: "name2",
            type: "string"
        }, {
            title: "Data urodzenia",
            field: "date_of_birth",
            type: "string",
        }]}
        data={materialTableWrapFetch(fetchSelectPatients)}
        actions={[
            {
                hidden: !editBtn,
                icon: "edit",
                tooltip: 'Edytuj',
                onClick: (event, rowData) => {
                    if (!Array.isArray(rowData)) {
                        history.push(`/patients/${rowData.patient_id}`);
                    }
                }
            }
        ]}
        options={{
            padding: padding,
            actionsColumnIndex: -1,
            toolbar: false,
            search: false,
            filtering: true,
            pageSize: 10,
        }}
    />
}
