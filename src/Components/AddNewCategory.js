import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';  // Import DialogContentText
import AddIcon from '@mui/icons-material/Add';
import ColorButton from './ColorButton';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function AlertDialog({ DialogHeading, updateCategories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [categoryEmptyError, setCategoryEmptyError] = useState(false);  // New state for error

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCategoryEmptyError(false); 
  };

  const handleUpdate = () => {
    if (value.trim() === '') {
      setCategoryEmptyError(true);
    } else {
      updateCategories(value);
      handleClose();
      setValue("")
    }
  }


  return (
    <React.Fragment>
      <ColorButton
        name={<AddIcon />}
        color="--tiara"
        background="--primary-blue-dark"
        backgroundHover="--primary-blue-extra-dark"
        variant="outlined"
        clickfunction={handleClickOpen}
      />
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {DialogHeading}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="add-new-category-text-field"
            style={{ flexGrow: 1 }}
            label="Category"
            variant="standard"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setCategoryEmptyError(false);
            }}
          />
          {/* Conditionally render the error message */}
          {categoryEmptyError && (
            <DialogContentText color="error">
              Category cannot be empty!
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <ColorButton
            name="Add"
            color="--tiara"
            background="--primary-blue-dark"
            backgroundHover="--primary-blue-extra-dark"
            variant="contained"
            clickfunction={handleUpdate}
          />
          <ColorButton
            name="Close"
            color="--tiara"
            background="--primary-blue-dark"
            backgroundHover="--primary-blue-extra-dark"
            variant="contained"
            clickfunction={handleClose}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
