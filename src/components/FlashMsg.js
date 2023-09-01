import { useState } from 'react';
import Alert from '@mui/material/Alert';

function FlashMsg({type='error', message}) {
  const [open, setOpen] = useState(true);

  return (
    open && 
    <Alert variant="outlined" severity={type} onClose={() => {setOpen(false)}}> {message} 
    </Alert> 
    
  )
}

export default FlashMsg;