import React from 'react';
import { Router } from '@reach/router';

// Components
import { Home, Symbol } from './components';

// Styles
import './assets/styles/App.scss';

function App(): JSX.Element {
    return (
        <div className="App">
            <h1>Stonks</h1>
            <Router>
                <Home path="/" />
                <Symbol path="/symbol/:symbol" />
            </Router>
        </div>
    );
}

export default App;
