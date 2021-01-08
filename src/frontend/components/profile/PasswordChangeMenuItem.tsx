import React, {FC, useState} from "react";
import {MenuItemLink, useTranslate} from "react-admin";
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PasswordChangeMenuItem: FC<{
    sidebarIsOpen: boolean
}> = ({
          sidebarIsOpen
      }) => {

    const translate = useTranslate();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <>

        <MenuItemLink
            to="#"
            primaryText="Miscellaneous"
            leftIcon={<LockIcon/>}
            sidebarIsOpen={sidebarIsOpen}
            onClick={handleOpen}
        />

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Zmień hasło
            </DialogTitle>

            <DialogContent>

                <TextField
                    autoFocus
                    type="password"
                    margin="dense"
                    label={translate("ra.auth.password")}
                    fullWidth
                />

                <TextField
                    autoFocus
                    type="password"
                    margin="dense"
                    label={translate("ra.auth.password")}
                    fullWidth
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={handleClose} color="primary">
                    {translate("ra.action.cancel")}
                </Button>

                <Button onClick={handleClose} color="primary">
                    {translate("ra.action.save")}
                </Button>

            </DialogActions>

        </Dialog>

    </>
}

export default PasswordChangeMenuItem;