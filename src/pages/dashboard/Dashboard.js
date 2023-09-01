import { useState, useEffect, useContext } from 'react';

import UserContext from "../../context/UserContext";
import ExpenseBudApi from '../../api/api';
import BarChart from "../../components/BarChart";
import PieChart from '../../components/PieChart';
import ExpenseTable from '../expenses/ExpenseTable';
import { groupAndAggregateData, budgetByCategory } from '../../utils/aggregateData';

import './Dashboard.css';
import Typography from '@mui/material/Typography';

function Dashboard() {
  const { currentUser } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  console.debug(
    "Dashboard",
    "expenses=", expenses,
    "budgets=", budgets,
  )

  useEffect(() => {
    async function getAllExpenses() {
      try {
        let expenses = await ExpenseBudApi.getAllExpenses(currentUser.id);
        setExpenses(expenses);
      } catch (err) {
        console.error(err);
      }
    };
    async function getAllBudgets() {
      try {
        let budgets = await ExpenseBudApi.getAllBudgets(currentUser.id);
        setBudgets(budgets);
      } catch (err) {
        console.error(err);
      }
    };

    getAllExpenses();
    getAllBudgets();
  }, [])

  useEffect(() => {
    const aggregatedExpenses = groupAndAggregateData(expenses);
    const aggregatedBudgets = budgetByCategory(budgets);

    const datasets = [
      {
      data: aggregatedExpenses.map(expense => expense.amount),
      backgroundColor: ['#5FA8D3', '#F9C74F', '#43AA8B', '#6a4c93','#F94144', '#F8961E', '#B0BBBF'] 
      },
      {
      data: aggregatedExpenses.map(expense => aggregatedBudgets[expense.category]),
      backgroundColor: ['#91d3fa', '#ffe29c', '#93f5d7', '#c0a8e0','#f58284', '#f5b76c', '#ebf4f7'] 
      }
    ]

    const barData = {
      labels: aggregatedExpenses.map(expense => expense.category),
      datasets: datasets
    };

    const pieData = {
      labels: aggregatedExpenses.map(expense => expense.category),
      datasets: [datasets[0]]
    };

    setBarData(barData);
    setPieData(pieData);
  }, [expenses, budgets]);

  const [barData, setBarData] = useState({labels: '' ,datasets: [] });
  const [pieData, setPieData] = useState({labels: '' ,datasets: [] });

  
  return (
    <div className='Dashboard'>
       <Typography component="h1" variant="h5">
        Dashboard
      </Typography>

      {(expenses.length && budgets.length)
        ? (
        <>
        <div className='Dashboard-row'>
          <div className='Dashboard-bar'>
            Expenses vs Budgets
            <BarChart chartData={barData}></BarChart>
          </div>
          <div className='Dashboard-pie'>
            Distribution
            <PieChart chartData={pieData}></PieChart>
          </div>
        </div>
        <div className='Dashboard-table'>
          Most recent transactions
          <ExpenseTable data={expenses} showPagination={false} />
        </div>
        </>
        )
        : (
        <>
          <Typography variant="h6" gutterBottom>
            Welcome {currentUser.firstName}! 
          </Typography>
          <Typography variant="body1" gutterBottom>
            There is no data yet to display on the dashboard. Here are a few ways to get started: <br />
            - Set up budget goals for each category in the Budgets tab.
            <br />
            - Link a bank account and sync your credit card transactions in the Accounts tab. 
            <br />
            - View the sync'd transactions in the Expenses tab, or manually enter transactions. 
          </Typography>
        </>
          
        )
      }
     
      
    </div>
  )
}

export default Dashboard;