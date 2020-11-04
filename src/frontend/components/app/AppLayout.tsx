import React from "react";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useHistory} from "react-router-dom";

const drawer_width = 260;

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: "100vh",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appBarTitle: {
        flexGrow: 1
    },
    appButton: {
        marginRight: theme.spacing(2)
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: drawer_width,
            flexShrink: 0,
        },
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
    drawerPaper: {
        width: drawer_width,
        boxSizing: "content-box",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
    drawerPlaceHolder: {
        width: drawer_width
    },
    main: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        minHeight: "100%",
        "&>*+*": {
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
            marginLeft: drawer_width,
        },
    },
    content: {
        paddingBottom: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: "auto",
        marginLeft: 0,
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: "auto",
        backgroundColor:
            theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    bottomBar: {
        position: "fixed",
        top: "auto",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.drawer + 1,
    }
}), {name: AppLayout.name});

export default function AppLayout(props: {
    children: React.ReactNode
    appIcon?: React.ReactNode
    appName: React.ReactNode
    headerRight?: React.ReactElement
    navigation?: React.ReactElement
    sideBar?: React.ReactElement
    footer?: React.ReactElement
    bottomBar?: React.ReactElement

    onAppIconClick?: React.MouseEventHandler
}) {
    const classes = useStyles();

    const history = useHistory();
    console.log(history);

    return (
        <Box className={classes.root}>
            <CssBaseline/>

            <Box>
                <Toolbar/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>

                        {props.appIcon ? (
                            <IconButton
                                color="inherit"
                                edge="start"
                                className={classes.appButton}
                                onClick={props.onAppIconClick}>
                                {props.appIcon}
                            </IconButton>
                        ) : (
                            <Hidden mdUp implementation="css">
                                <IconButton
                                    color="inherit"
                                    edge="start"
                                    className={classes.appButton}>
                                    <MenuIcon/>
                                </IconButton>
                            </Hidden>
                        )}

                        <Typography variant="h6" className={classes.appBarTitle}>
                            {props.appName}
                        </Typography>

                        {props.headerRight}

                    </Toolbar>
                </AppBar>
            </Box>

            <Box display="flex">

                {props.navigation ? <AppDrawer anchor="left">{props.navigation}</AppDrawer> : null}

                <Box flexGrow={1}>

                    <Box display="flex">

                        <Box flexGrow={1}>

                            <main className={classes.content}>
                                {props.children}
                            </main>

                        </Box>

                        {props.sideBar ? <AppDrawer anchor="right">{props.sideBar}</AppDrawer> : null}

                    </Box>

                    {props.footer ? (
                        <footer className={classes.footer}>
                            {props.footer}
                        </footer>
                    ) : null}

                </Box>
            </Box>

            {props.bottomBar ? (
                <Box className={classes.bottomBar + ' mui-fixed'} boxShadow={3}>
                    <Toolbar disableGutters={false}>
                        {props.bottomBar}
                    </Toolbar>
                </Box>
            ) : null}
        </Box>
    )
}

function AppDrawer(props: {
    anchor: "right" | "left"
    hasBottomBar?: boolean
    children: React.ReactNode
}) {
    const {children} = props;

    const classes = useStyles();
    const theme = useTheme();
    const [mobile_open, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobile_open)
    }


    return (
        <Box className={classes.drawer}>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={props.anchor}
                    open={mobile_open}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                        <CloseIcon/>
                    </IconButton>
                    <Box>
                        {props.children}
                    </Box>
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    className={classes.drawer}
                    anchor={props.anchor}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper + (props.anchor === "right" ? " mui-fixed" : ""),
                    }}
                >
                    <Toolbar/>
                    <Box>
                        {props.children}
                    </Box>

                    {(props.hasBottomBar ?? true) ? <Toolbar/> : null}

                </Drawer>
            </Hidden>
        </Box>
    );
}
