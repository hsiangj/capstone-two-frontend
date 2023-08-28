import { useEffect, useState, useContext } from "react";

import UserContext from "../../context/UserContext";
import ExpenseBudApi from "../../api/api";
import BudgetCard from "./BudgetCard";

import Alert from '@mui/material/Alert';

function BudgetList() {
  const { currentUser } = useContext(UserContext);
  const [budgets, setBudgets] = useState([]);

  console.debug(
    "BudgetList",
    "currentUser", currentUser,
    "budgets=", budgets
  )

  const editBudget = async(budgetId, editData) => {
    try {
      await ExpenseBudApi.updateBudget(currentUser.id, budgetId, editData);
      setBudgets(budgets => budgets.map( budget => 
        budget.budget_id === budgetId
        ? {...budget, amount: editData }
        : budget ))
      return {success: true};
    } catch (err) {
      return {success: false, err};
    }
  }

  const addBudget = async(addData) => {
    try {
      await ExpenseBudApi.addBudget(currentUser.id, addData);
      setBudgets(budgets => budgets.map( budget => 
        budget.category_id === addData.category_id
        ? {...budget, ...addData}
        : budget));
      return {success: true};
    } catch (err) {
      return {success: false, err};
    }
  } 
  

  useEffect(() => {
    async function getAllBudgets() {
      try {
        let budgets = await ExpenseBudApi.getAllBudgets(currentUser.id);
        setBudgets(budgets);
      } catch (err) {
        console.error(err);
      }
    }
    getAllBudgets();
  }, [])


  return (
    <div>
      <h1>This is budgetlist</h1>

        {budgets.map(b => (
          <BudgetCard 
            key={b.category} 
            id={b.budget_id}
            amount={b.amount}
            category={b.category}
            category_id={b.category_id} 
            edit={editBudget}
            add={addBudget}
          />
         
        ))}
    
    </div>
    

  )
}


export default BudgetList;