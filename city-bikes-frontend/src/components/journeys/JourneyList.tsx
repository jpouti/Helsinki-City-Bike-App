import React from 'react';
import { IJourney } from '../../types';

type JourneyItemProps = {
    journey: IJourney
}

// Displaying one journey
const JourneyItem: React.FC<JourneyItemProps> = ({ journey }) => {
    if (!journey) {
        return null
    }

    // convert time stamp to object with formats date: YYYY-MM-DD, time: HH:mm:ssss
    const convertTimeStamp = (timestamp:Date) => {
        const date = timestamp.toString().split('T')
        const time = date[1].split('.')[0]

        const dateTime = {
            date: date[0],
            time,
        }

        return dateTime
    }

    const departureTime = convertTimeStamp(journey.departure)
    const returnTime = convertTimeStamp(journey.return)

    const distance = journey.distance / 1000
    const duration = journey.duration / 60

    return (
        <div>
            <div>{departureTime.date}</div>
            <div>{returnTime.time}</div>
            <div>{journey.departureStationId}</div>
            <div>{journey.departureStationName}</div>
            <div>{journey.returnStationId}</div>
            <div>{journey.returnStationName}</div>
            <div>{distance} km</div>
            <div>{duration} min</div>
        </div>
    )
}

type JourneyListProps = {
    journeys: IJourney[]
}

// List of journeys
const JourneyList: React.FC<JourneyListProps> = ({ journeys }) => {
    console.log(journeys, 'journeylist')

    if (!journeys) {
        return null
    }

    return (
        <div>
            JourneyList
            <div>
                {journeys.map((journey, index) => {
                    return <JourneyItem journey={journey} key={index} />
                })}
            </div>
        </div>
    )
}

export default JourneyList
