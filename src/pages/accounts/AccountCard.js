import './AccountList.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function AccountCard({ id, type, name, remove, sync }) {
  return (
    <Card sx={{ minWidth: 10, width: 180 }} className='AccountList-card'>
      <CardContent>
        <Typography>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="small" color="success" onClick={()=>sync(id)}>Sync $</Button>
        <Button size="small" onClick={()=>remove(id)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default AccountCard;