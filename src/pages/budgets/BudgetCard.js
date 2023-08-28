import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function BudgetCard({id, amount=null, category, category_id, edit, add}) {

  const [editAmount, setEditAmount] = useState(amount);
  const [isEditing, setIsEditing] = useState(false);

  console.debug(
    "BudgetCard",
    "budgets=", 
    "editAmount=", editAmount,
    "isEditing=", isEditing
  )

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleChange = (e) => {
    setEditAmount(e.target.value);
  }

  const handleEdit = async(e) => {
    e.preventDefault();
    
    if (amount === null) {
      const addBudget = await add({category_id, amount: +editAmount})
    } else {
      const editBudget = await edit(id, {amount: +editAmount});
    }
    setIsEditing(false);
   
  }

  let jsx = (
    <>
      <TextField value={editAmount}/>
      <IconButton onClick={toggleEdit}>
        <EditIcon fontSize="sm" />
      </IconButton>
    </>
  )

  if(isEditing){
    jsx = (
      <Box component="form" onSubmit={handleEdit}>
        <TextField onChange={handleChange} value={editAmount}/>
        <Button type="submit" variant="outlined" size="small">Save</Button>
      </Box>
    )
  }

  return (
    <Box className="BudgetCard" sx={{ mt: 2, display: 'flex'}}>
      <Typography component="h3" sx={{pr: 1}}>
        {category}    
      </Typography>
      {jsx}
    </Box>
  )
}

export default BudgetCard;