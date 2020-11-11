import React from 'react'
import logo from './logo.svg';
//import './App.css';

import LeftMenu from './components/LeftMenu'
import MainContent from './components/MainContent'

function App() {
  return (
    <React.Fragment>
      <LeftMenu></LeftMenu>
      <MainContent></MainContent>
    </React.Fragment>
  );
}

export default App;
