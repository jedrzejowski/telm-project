import React, {FC, createElement} from "react";
import {useSelector} from "react-redux";
import {useMediaQuery} from "@material-ui/core";
import {
    MenuItemLink, getResources, ReduxState,
    AppBar, UserMenu, Layout, useTranslate
} from "react-admin";
import LabelIcon from "@material-ui/icons/Label";
import type {Theme} from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import PasswordChangeMenuItem from "./components/profile/PasswordChangeMenuItem";

const useClasses = makeStyles(theme => ({
    menuRoot: {
        paddingTop: theme.spacing(4),
    }
}));

export const MyMenu: FC<{
    onMenuClick: any
    logout: any
}> = ({
          onMenuClick,
          logout,
          ...props
      }) => {

    const classes = useClasses();
    const translate = useTranslate();

    const isXSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));
    const open = useSelector<ReduxState, boolean>(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);

    return (
        <div className={classes.menuRoot}>
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={(resource.options && resource.options.label) || resource.name}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    {...props}
                />
            ))}

            <Divider/>

            <PasswordChangeMenuItem sidebarIsOpen={open}/>

            {isXSmall && logout}
        </div>
    );
};

export const MyAppBar: FC<{}> = (props) => {
    return (
        <AppBar {...props} />
    );
};

export const MyLayout: FC<{}> = (props) => {
    return (
        <Layout {...props} menu={MyMenu} appBar={MyAppBar}/>
    );
}