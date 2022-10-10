import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Dispatch, SetStateAction } from 'react';

interface Iprops
{
    open: boolean,
    tips: string,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CustomizedSnackbars = (props: Iprops) => {
  const {open, tips ,setOpen} = props;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          { tips }
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default CustomizedSnackbars; 
