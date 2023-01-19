import React from 'react'
import getJourneys from './services/journeys'

function App() {
    const fetchJourneys = async () => {
        const res = await getJourneys({ page:null, limit:2 })
        console.log(res)
    }
    fetchJourneys()
    return (
        <div className="App">
            <header className="App-header">
                Helsinki City Bikes
            </header>
        </div>
    );
}

export default App;
