import React, {FC} from "react";
import {AutocompleteInput, ReferenceInput, ReferenceField, TextField} from "react-admin";
import {personel2str} from "../../../data/personel";
import PersonelField from "./PersonelField";

type Props = Omit<Parameters<typeof ReferenceInput>[0], "children" | "reference">;

function search2query(searchText: string) {
    return {name: searchText}
}

export const PersonelReferenceInput: FC<Props> = (props) => {

    return (
        <ReferenceInput
            {...props}
            source={props.source}
            reference="personel"
            filterToQuery={search2query}
        >
            <AutocompleteInput optionText={personel2str} fullWidth={props.fullWidth}/>
        </ReferenceInput>
    )
}

export const PersonelReferenceField: FC<Props> = (props) => {

    return (
        <ReferenceField
            {...props}
            source={props.source}
            reference="personel"
        >
            <PersonelField/>
        </ReferenceField>
    )
}