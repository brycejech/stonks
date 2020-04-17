import React from 'react';
import { Router } from '@reach/router';

// Components
import { Navigation, Home, Symbol } from './components';

// Styles
import './assets/styles/app.scss';

function App(): JSX.Element {
    return (
        <div className="app">
            <Navigation />
            <main className="main">
                <Router>
                    <Home path="/" />
                    <Symbol path="/symbol/:symbol" />
                </Router>
            </main>
        </div>
    );
}

export default App;
