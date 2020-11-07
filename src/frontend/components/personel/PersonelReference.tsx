import React from "react";
import {AutocompleteInput, ReferenceInput} from "react-admin";
import {personel2str} from "../../../data/personel";

function search2query(searchText: string) {
    return {name: searchText}
}

export function PersonelReferenceInput(props: {
    source: string;
    [key: string]: any;
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