import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';

import Header from './components/Header'
import JourneyView from './components/journeys/JourneyView';
import Map from './components/Map';
import NotFound from './components/NotFound';
import SingleStation from './components/stations/SingleStation';
import StationsView from './components/stations/StationsView';

const Home = () => {
    return (
        <div>
            <h1>Helsinki City Bikes</h1>
            <Map position={[60.2, 24.9]} />
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
            <Footer />
        </div>
    );
}

export default App;
