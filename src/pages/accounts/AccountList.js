import { useState, useEffect, useContext } from 'react';

import UserContext from '../../context/UserContext';
import PlaidLink from '../../PlaidLink';
import ExpenseBudApi from '../../api/api';
import AccountCard from './AccountCard';

import './AccountList.css';
import Typography from '@mui/material/Typography';

function AccountList() {
  const {currentUser} = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);

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

  async function getAllAccounts() {
    try {
      let accounts = await ExpenseBudApi.getAllAccounts(currentUser.id);
      setAccounts(accounts);
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {

    getAllAccounts();
  }, [])

  async function handleAccessTokenSuccess() {
    await getAllAccounts()
  }
  

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
      />    
      )))
      : <h3>There are currently no accounts.</h3> 
        
     }
    </div>
  </div>
  
  )
}

export default AccountList;