import React from "react";
import MaterialTable, {MaterialTableProps} from "material-table";
import Box from "@material-ui/core/Box";
import {useHistory} from "react-router-dom";
import {materialTableLocalization, materialTableWrapFetch} from "../../lib/materialTable";
import {PersonelShortT} from "../../../data/personel";
import {fetchSelectPersonel} from "../../data/personel";

export default function PersonelList(props: {
    padding?: "default" | "dense"
    editBtn?: boolean
}) {
    const {
        padding = "default",
        editBtn = true
    } = props;

    const history = useHistory();
    const table_ref = React.useRef<MaterialTableProps<any>>();

    return <MaterialTable<PersonelShortT>
        components={{
            Container: Box
        }}
        tableRef={table_ref}
        title="Lista poświadczeń"
        localization={materialTableLocalization}
        columns={[{
            title: "Nazwisko",
            field: "name1",
            type: "string"
        }, {
            title: "Imię",
            field: "name2",
            type: "string"
        }]}
        data={materialTableWrapFetch(fetchSelectPersonel)}
        actions={[
            {
                hidden: !editBtn,
                icon: "edit",
                tooltip: 'Edytuj',
                onClick: (event, rowData) => {
                    if (!Array.isArray(rowData)) {
                        history.push(`/personel/${rowData.personel_id}`);
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
