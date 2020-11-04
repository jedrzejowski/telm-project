import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PrintIcon from "@material-ui/icons/Print";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

export type AppNavItemI = {
    label: string
    to?: string
    icon?: React.FunctionComponent
    items?: AppNavItemI[]
    onClick?: () => void
} | "---"

function AppNavigation(props: {
    items: AppNavItemI[]
}) {
    return (
        <List component="nav">
            {props.items.map((nav_item, i) => {
                return <NavItem key={i} navItem={nav_item}/>
            })}
        </List>
    )
}

function NavItem(props: { navItem: AppNavItemI }) {
    const {navItem} = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    if (navItem === "---") {
        return (
            <Divider/>
        )
    }

    const item = (
        <ListItem button onClick={navItem.onClick}>

            <ListItemIcon>
                {navItem.icon ? React.createElement(navItem.icon, {}) : null}
            </ListItemIcon>

            <ListItemText primary={navItem.label}/>

            {navItem.items ? (
                open ? <ExpandLess onClick={handleClick}/> : <ExpandMore onClick={handleClick}/>
            ) : null}

        </ListItem>
    );

    const children = navItem.items ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

                {navItem.items.map((nav_item, i) => {
                    return <NavItem key={i} navItem={nav_item}/>
                })}

            </List>
        </Collapse>
    ) : null;


    if (navItem.to) {
        return <>
            <Link component={RouterLink} to={navItem.to} underline="none" color="inherit">
                {item}
            </Link>
            {children}
        </>
    } else {
        return <>
            {item}
            {children}
        </>;
    }
}

export default React.memo(AppNavigation);
