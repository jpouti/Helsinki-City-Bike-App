import React from 'react'
import JourneyView from './components/journeys/JourneyView';
import StationsView from './components/stations/StationsView';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Helsinki City Bikes
            </header>
            <JourneyView />
            <StationsView />
        </div>
    );
}

export default App;
