import React, { useState } from 'react';

import AppHeader from '../app-header/app-header';
import { Routes } from '../../routes';

function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  return (
    <>
      <AppHeader activeTab={activeTab} selectTab={setActiveTab} />
      <Routes />
    </>
  );
}

export default App;
