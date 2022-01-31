import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';

function App({ contract, currentUser, nearConfig, wallet }) {
  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, 'Near Todo List');
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <>
      <h1>NEAR Todos CRUD App</h1>
      {currentUser ? (
        <div>
          <h2>
            Account ID: {currentUser.accountId}
            {" "}
            <button onClick={signOut}>Log out</button>
          </h2>

          <CreateTodo contract={contract} />
          <TodoList contract={contract} />
        </div>
      ) : (
        <div>
          Sign in to use the app:
          {" "}
          <button onClick={signIn}>Log in</button>
        </div>
      )}
    </>
  );
}

App.propTypes = {
  contract: PropTypes.shape({
    create: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }).isRequired,
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired
};

export default App;
