import React from 'react';
import { Router } from '@reach/router';

// Components
import { Navigation, Home, Symbol, Sidebar } from './components';

// Styles
import './assets/styles/app.scss';

function App(): JSX.Element {
    return (
        <div className="app">
            <Navigation />
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>
            <main className="main">
                <div className="container-fluid">
                    <Router>
                        <Home path="/" />
                        <Symbol path="/symbol/:symbol" />
                    </Router>
                </div>
            </main>
        </div>
    );
}

export default App;
