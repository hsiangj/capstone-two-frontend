import { useEffect, useState, useContext } from "react";

import UserContext from "../../context/UserContext";
import ExpenseBudApi from "../../api/api";
import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";

import Typography from '@mui/material/Typography';

function ExpenseList() {
  const { currentUser } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);

  console.debug(
    "ExpenseList",
    "expenses=", expenses
  )
  
  async function getAllExpenses() {
    try {
      let expenses = await ExpenseBudApi.getAllExpenses(currentUser.id);
      setExpenses(expenses);
    } catch (err) {
      console.error(err);
    }
  }

  const addExpense = async(newExpense) => {
    try {
      await ExpenseBudApi.addExpense(currentUser.id, newExpense);
      getAllExpenses()
      return {success: true};
    } catch (err) {
      return {success: false, err};
    }
  } 

  useEffect(() => {
    getAllExpenses();
  }, [])

  return (
    <div>
      <Typography component="h1" variant="h5">
        Expenses
      </Typography>
      <ExpenseForm add={addExpense}/>
      {expenses.length
      ? (<ExpenseTable data={expenses}/>)
      : <h3>There are currently no expense transactions.</h3>
      }
    </div>
  )
}



export default ExpenseList;