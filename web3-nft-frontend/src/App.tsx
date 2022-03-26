import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './routes/main';
import MyAnimal from './routes/MyAnimal';

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
   <Layout>
    <Routes>
     <Route path='/' element={<Main account={account} />} />
     <Route path='my-animal' element={<MyAnimal account={account} />} />
    </Routes>
   </Layout>
  </BrowserRouter>
 );
};

export default App;
