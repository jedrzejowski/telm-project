import React from "react";
import {AutocompleteInput, ReferenceInput} from "react-admin";
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