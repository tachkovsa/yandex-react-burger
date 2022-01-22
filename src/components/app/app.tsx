import React from 'react';
import AppHeader from '../app-header/app-header';

// import appStyles from './app.module.css';

const App = () => {
  const [state, setState] = React.useState({
    activeTab: 'constructor'
  });

  const selectTab = (tab) => setState({ activeTab: tab });

  return (
    <>
      <AppHeader activeTab={state.activeTab} selectTab={selectTab}/>
    </>
  );
}

export default App;
