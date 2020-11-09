import React from "react";
import {AutocompleteInput, ReferenceInput, ReferenceField, TextField} from "react-admin";
import {personel2str} from "../../../data/personel";

type Props = Omit<Parameters<typeof ReferenceInput>[0], "children" | "reference">;

function search2query(searchText: string) {
    return {name: searchText}
}

export function PersonelReferenceInput(props: Props & {
    source: string;
}) {
    const {fullWidth} = props;

    return (
        <ReferenceInput
            {...props}
            className="fixme"
            reference="personel"
            filterToQuery={search2query}
        >
            <AutocompleteInput optionText={personel2str} fullWidth={fullWidth}/>
        </ReferenceInput>
    )
}

export function PersonelReferenceField(props: Props & {
    source: string;
}) {
    const {fullWidth} = props;

    return (
        <ReferenceField
            {...props}
            className="fixme"
            reference="personel"
        >
            <TextField source="name1"/>
            <TextField source="name2"/>
        </ReferenceField>
    )
}