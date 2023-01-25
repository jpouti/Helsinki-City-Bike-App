import React from 'react'
import { Routes, Route } from 'react-router-dom'

import JourneyView from './components/journeys/JourneyView';
import StationsView from './components/stations/StationsView';

const Home = () => {
    return (
        <div>
            <h1>Helsinki City Bikes</h1>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Helsinki City Bikes
            </header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/journeys' element={<JourneyView />} />
                <Route path='/stations' element={<StationsView />} />
            </Routes>
        </div>
    );
}

export default App;
