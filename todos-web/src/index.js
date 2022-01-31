import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

// Initializing contract
async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  console.log({ nearConfig })

  // initialize connection to the NEAR Testnet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  console.log({ near })


  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);

  console.log({ walletConnection })


  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount
    };
  }

  // initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      // view methods are read-only - they don't modify the state, but usually return some value
      viewMethods: ['get'],
      // change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ['create', 'update', 'del'],
      // sender is the account ID to initialize transactions with
      // getAccountId() returns the current account ID, returns empty string if user is still unrecognized
      sender: walletConnection.getAccountId(),
    });

  return { contract, currentUser, nearConfig, walletConnection };
}

window.nearInitPromise = initContract()
  .then(({ contract, currentUser, nearConfig, walletConnection }) => {
    ReactDOM.render(
      <React.StrictMode>
        <App
          contract={contract}
          currentUser={currentUser}
          nearConfig={nearConfig}
          wallet={walletConnection}
        />
      </React.StrictMode>,
      document.getElementById('root')
    );
  })
