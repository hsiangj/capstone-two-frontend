import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

import ExpenseBudApi from './api/api';

function PlaidAuth({plaidData, onLinkSuccess}) {
  
  const [account, setAccounts] = useState();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    async function getPublicToken() {
      try {
        let accessToken = await ExpenseBudApi.exchangePublicToken({
          public_token: plaidData.public_token,
          metadata: plaidData.metadata
        }); 
        setAccessToken(accessToken);
        if (onLinkSuccess) {
          onLinkSuccess();
        }
        // console.debug('access token:', accessToken);
        // let auth = await ExpenseBudApi.getAccountNum({ access_token: accessToken });
        // console.log(auth)
        // setAccounts(auth.numbers.ach[0]);

        // let transactions = await axios.post(`${BASE_URL}/plaid/transactions/sync`, {
        //   access_token: accessToken.data.accessToken 
        // });
        //   console.log(transactions)
      } catch(e) {
      console.log('failed', e)
      }
    } 
     
    getPublicToken();
  }, [])
  return accessToken && (<PlaidLink />)
}





function PlaidLink({onLinkSuccess}) {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [plaidData, setPlaidData] = useState({}); //includes public token and metadata

  useEffect(() => {
    async function createLinkToken() {
      const response = await ExpenseBudApi.createLinkToken();
      setLinkToken(response.link_token);
    }

    createLinkToken();
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

    },
  });
    
  return publicToken ? (<PlaidAuth plaidData={plaidData} onLinkSuccess={onLinkSuccess}/>) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );

}

export default PlaidLink;