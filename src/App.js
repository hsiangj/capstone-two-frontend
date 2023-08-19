// import './App.css';
import { useEffect, useState } from "react";

import axios from "axios";
import { usePlaidLink } from 'react-plaid-link';

const BASE_URL = 'http://localhost:3001'

function PlaidAuth({publicToken, plaidData}) {
  const [account, setAccounts] = useState();
  useEffect(() => {
    async function fetchData() {
      try { 
        let accessToken = await axios.post(`${BASE_URL}/plaid/exchange_public_token`, {
        public_token: plaidData.public_token,
        metadata: plaidData.metadata
     
      });
        console.debug('access token:', accessToken.data);
        let auth = await axios.post(`${BASE_URL}/plaid/auth/get`, {
          access_token: accessToken.data.accessToken
        });
        console.log(auth)
        setAccounts(auth.data.numbers.ach[0]);
        let transactions = await axios.post(`${BASE_URL}/plaid/transactions/sync`, {
          access_token: accessToken.data.accessToken 
        });
          console.log(transactions)
      } catch(e) {
      console.log('failed', e)
      }
    } 
     
    fetchData();
  }, [])
  return account && (<span>{account.account}</span>)
}


function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [plaidData, setPlaidData] = useState(); //includes public token and metadata

  useEffect(() => {
    async function fetch() {
      const response = await axios.post(`${BASE_URL}/plaid/create_link_token`);
      setLinkToken(response.data.link_token);
    }

    fetch();
  }, [])

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      const data = {
        public_token,
        metadata
      }
      setPublicToken(public_token)
      setPlaidData(data)
      // send public_token to server
      //// will need to update
    },
  });
  
  return publicToken ? (<PlaidAuth publicToken={publicToken} plaidData={plaidData}/>) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

export default App;
