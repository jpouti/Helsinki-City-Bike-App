import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import JourneyView from './components/journeys/JourneyView';
import NotFound from './components/NotFound';
import SingleStation from './components/stations/SingleStation';
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
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/journeys' element={<JourneyView />} />
                <Route path='/stations' element={<StationsView />} />
                <Route path='/stations/:id' element={<SingleStation />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
