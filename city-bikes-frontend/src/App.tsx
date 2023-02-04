import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';

import Header from './components/Header'
import Home from './components/Home'
import JourneyView from './components/journeys/JourneyView';
import NotFound from './components/NotFound';
import SingleStation from './components/stations/SingleStation';
import StationsView from './components/stations/StationsView';

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
            <Footer />
        </div>
    );
}

export default App;
