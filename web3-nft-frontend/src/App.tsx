import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './routes/main';

const App: FC = () => {
 const [account, setAccount] = useState<string>('');
 const getAccount = async () => {
  try {
   if (window.ethereum) {
    const accounts = await window.ethereum.request({
     method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
   } else {
    alert('Install Metamast!');
   }
  } catch (err) {
   console.error(err);
  }
 };

 useEffect(() => {
  getAccount();
 }, []);
 return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<Main account={account} />} />
   </Routes>
  </BrowserRouter>
 );
};

export default App;
