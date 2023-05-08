import { useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export function AlertDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClearForm = () => {
    props.clearForm()
    handleClose()
  }
  return (
    <div>
      <Button variant="outlined" size='large' color='error' onClick={handleClickOpen}>
        Очистить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Подтвердите удаление данных"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Очистить форму? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClearForm} autoFocus> 
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}