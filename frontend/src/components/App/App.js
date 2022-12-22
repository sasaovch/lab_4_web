import React, { useEffect } from 'react';
import './App.css';
import MainBlock from '../MainBlock/MainBlock';
import Login from '../Login/Login';
import { useToken } from './useToken';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {Provider} from "react-redux";
import {store} from "../../redux/store.js";
import Clock from '../Clock/Clock';

function App() {

  const { token, setToken, validToken, setValidToken } = useToken();

  useEffect(() => {
    setValidToken()
  }, [token]);

  if(validToken === true) {
    return (
      <div className="wrapper">
        <Provider store={store}>
          <main className="content">
            <Header/>
            <MainBlock/>
          </main>
        </Provider>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="content">
        <Header/>
        <Login setToken={setToken} />
        <div className="clock-container grid">
            <Clock/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
