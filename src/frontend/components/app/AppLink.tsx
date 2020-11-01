import React from "react";
import MuiLink from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";

export default function AppLink(props: Parameters<typeof MuiLink>[0]) {
    return React.createElement(MuiLink, {
        // @ts-ignore
        component: RouterLink,
        // @ts-ignore
        ...props[0]
        // @ts-ignore
    }, props[0].children);
}