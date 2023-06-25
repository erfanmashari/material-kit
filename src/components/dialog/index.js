import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ icon, title, description, cancelOnly, doneFunc }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClickOpen} style={{ background: "inherit", border: "none", outline: "none" }}>
                {icon}
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                {description ? <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent> : ""}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {!cancelOnly ? <Button onClick={() => {
                        handleClose();
                        doneFunc();
                        }} autoFocus>
                        Confirm
                    </Button> : ""}
                </DialogActions>
            </Dialog>
        </div>
    );
}