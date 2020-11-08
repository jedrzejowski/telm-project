import React from "react";
import {AutocompleteInput, ReferenceInput} from "react-admin";
import {patient2str, PatientT} from "../../../data/patients";

type Props = Omit<Parameters<typeof ReferenceInput>[0], "children" | "reference">;

function search2query(searchText: string) {
    return {name: searchText}
}

export function PatientReferenceInput(props: Props & {
    source: string;
}) {
    const {fullWidth} = props;

    return (
        <ReferenceInput
            {...props}
            className="fixme"
            reference="patients"
            filterToQuery={search2query}
        >
            <AutocompleteInput optionText={patient2str} fullWidth={fullWidth}/>
        </ReferenceInput>
    )
}
