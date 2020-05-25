import React from 'react';
import {useRoutes} from './useRoutes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/Auth.context';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes( isAuthenticated );

  if( !ready ){
   return <Loader />
  }
  
  return (
    <AuthContext.Provider value={ {token, userId, login, logout} }>
      { isAuthenticated && <Navbar /> }
      <div className='container'>
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
