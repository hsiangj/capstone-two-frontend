import { useState, useEffect, useContext } from 'react';

import UserContext from '../../context/UserContext';
import PlaidLink from '../../PlaidLink';
import ExpenseBudApi from '../../api/api';
import AccountCard from './AccountCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import './AccountList.css';
import Typography from '@mui/material/Typography';

function AccountList() {
  const {currentUser} = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);

  console.debug(
    "AccountList",
    "currentUser", currentUser,
    "accounts=", accounts
  )

  const deleteAccount = async (accountId) => {
    try {
      await ExpenseBudApi.deleteAccount(currentUser.id, accountId);
      setAccounts(accounts => accounts.filter( account => account.id !== accountId ));
      return {success: true};
    } catch (err) {
      return {success: false, err};
    }
  }

  const syncTransactions = async (accountId) => {
    try {
      let access_token = accounts.filter(account => account.id === accountId)[0].access_token;
      console.log('inside syncTransactions', access_token)
      await ExpenseBudApi.transactionsSync({access_token})
    } catch (err) {
      console.log(err)
      return {success: false, err}
    }
  }

  //function is outside of useEffect to allow handleAccessTokenSuccess to work
  async function getAllAccounts() {
    try {
      let accounts = await ExpenseBudApi.getAllAccounts(currentUser.id);
      setAccounts(accounts);
    } catch (err) {
      console.error(err);
    }
    setInfoLoaded(true);
  }

  useEffect(() => {
    setInfoLoaded(false);
    getAllAccounts();
  }, [])

  async function handleAccessTokenSuccess() {
    await getAllAccounts()
  }
  
  if (!infoLoaded) return <LoadingSpinner />

  return (
  
  <div>
    <Typography component="h1" variant="h5">
      Accounts
    </Typography>
    <div className='AccountList-add-account'>
      <PlaidLink onLinkSuccess={handleAccessTokenSuccess}/>
    </div>
    <div className='AccountList-card-group'>
    {accounts.length
      ? ( accounts.map(account => (
          <AccountCard 
          key={account.id}
          id={account.id}
          type={account.account_type}
          name={account.institution_name}
          remove={deleteAccount}
          sync={syncTransactions}
      />    
      )))
      : <h3>There are currently no accounts.</h3> 
        
     }
    </div>
  </div>
  
  )
}

export default AccountList;