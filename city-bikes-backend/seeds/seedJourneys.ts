import { IJourney } from "../src/models/journey"
const { connectToDatabase } = require('../src/utils/db')

const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')
const radash = require('radash')

const Journey = require('../src/models/journey')
const Station = require('../src/models/station')

// store all csv filenames from ./data/journeys/ to an array
const files:String[] = fs.readdirSync('./data/journeys')
let csvFiles = files.filter(file => {
    return path.extname(file).toLowerCase() === '.csv'
})
let filesLength:number = csvFiles.length

// results of data imports of each file
let seedResult: String[] = []

// valid ids for stations
let stationIds:number[] = []

// get valid ids for stations
async function getStationIds() {
    const ids:any = await Station.findAll({
        attributes: ['id']
    })
    // push valid ids to stationIds[]
    ids.map((station: { toJSON: () => { (): any; new(): any; id: any } }) => stationIds.push(station.toJSON().id))
    return stationIds
}

seedJourneyFiles(csvFiles)

async function seedJourneyFiles(csvFiles:String[]) {
    // connect to the database
    await connectToDatabase()
    // create new Journey table if not exists
    await Journey.sync()
    if (!csvFiles) {
        console.log('Error, could not find csv files from path: ./data/journeys.')
        console.log('Please add journey datasets on .csv format to the folder ./data/journeys/')
    }

    // get valid station ids for journeys to import
    await getStationIds()

    // seed journeys from each csv file
    for (let file of csvFiles) {
        seedJourneyFile(file)
    }
}

let totalCount: number = 0 // all journeys
let validJourneys: number = 0 // all valid journeys
let invalidStations: number = 0 // invalid station count

// import all provided valid journeys to PostgreSQL
// journey schema can be found -> ../src/models/journey.ts
async function seedJourneyFile(file:String) {
    let journeys:IJourney[] = [] // journeys from the file
    let count:number = 0 // count of valid journeys in file
    let returnString: String = ''
    let started:number = Date.now()
    console.log('starting to import file: ', file)

    // read the file content
    const pipeline = fs.createReadStream(`./data/journeys/${file}`)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async function (row:any) {
        // journey distance (m) and duration (s) must be at least 10
        if (row[6] > 10 && row[7] > 10) {
            // IF departureStationId or returnStationId does not belong to any station in db -> invalid journey
            if ( !stationIds.includes(parseInt(row[4])) || !stationIds.includes(parseInt(row[2])) ) {
                invalidStations += 1
            // journey distance and duration is valid + return and departure station is valid
            } else { 
                const journey:IJourney = {
                    departure: row[0],
                    return: row[1],
                    departureStationId: parseInt(row[2]),
                    departureStationName: row[3],
                    returnStationId: parseInt(row[4]),
                    returnStationName: row[5],
                    distance: row[6],
                    duration: row[7],
                }
                
                journeys.push(journey)
                validJourneys += 1
                count += 1
            }
        } 

        totalCount += 1
        
        // insert 50000 journeys to DB with on each patch
        if (count % 50000 === 0) {
            pipeline.pause()
            console.log(`${file} --- starting to insert next patch of journeys`)
            try {
                await Journey.bulkCreate(journeys)    
            } catch (error:any) {
                console.log('Error...: ', error.message)
            }

            console.log(`${file} --- Imported new journeys: ${journeys.length} / total imported ${count} `)
            journeys = []
            await radash.sleep(100)
            pipeline.resume()
        }
    })
    .on('end', async function() {
        console.log(`${file} --- starting to insert last patch of journeys`)
        try {
            await Journey.bulkCreate(journeys)    
        } catch (error:any) {
            console.log('Error...: ', error.message)
        }
        returnString = `${file} --- imported succesfully with ${count} valid journeys`
        seedResult.push(returnString)
        console.log(returnString)
        console.log(`${file} --- Operation took: ${(Date.now() - started)* 0.001} seconds`)
        
        isLastFile() // if processing last file -> end program
    })

}

// delete processed file from csvFiles array if its not last
// if last processed file start ending the program
function isLastFile(): Boolean {
    if (filesLength === 1) {
        end(seedResult)
        return true
    } else {
        filesLength -= 1
        return false
    }
}

// end the program and print details of imported journeys
function end(details: String[]) { 
    console.log('----------------------')
    console.log('Importing journeys is finished, details of the import can be seen on below:')
    console.log(`Total journeys ${totalCount}`)
    console.log(`Total valid journeys: ${validJourneys}`)
    console.log(`Invalid Journeys found: ${totalCount - validJourneys}`)
    console.log(`Invalid stations in journeys found: ${invalidStations}`)
    console.log('------------------------')
    console.log('Files: ')
    for (let detail of details) {
        console.log(detail)
    }
    process.exit(0)
}

export {}