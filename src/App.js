import './App.css';
import { Route, Link } from "wouter";
import SearchResults from './pages/SearchResults';
import Detail from './pages/Detail';
import StaticContext from './context/StaticContext';
import { GifsContextProvider } from './context/GifsContext';
import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('pages/Home'))

function App() {

  return (
    <StaticContext.Provider value={
      {
        name: 'mimudev',
        suscribeteAlCanal: true
      }
    }>
      <div className="App">
        <Suspense fallback={null}>
          <section className="App-content">
            <Link to='/'>
              <img className='App-logo' alt='insert logo' src='#'></img>
            </Link>
            <GifsContextProvider>
              <Route 
                path="/" 
                component={HomePage}
              />
              <Route 
                path="/search/:keyword" 
                component={SearchResults}
              />
              <Route 
                path="/gif/:id" 
                component={Detail}
              />
              <Route
                component={() => <h1>404 ERROR :(</h1>}
                path='/404'
              />
            </GifsContextProvider>
          </section>
        </Suspense>
      </div>
    </StaticContext.Provider>
  );
}

export default App;
