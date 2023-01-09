import { IStation } from '../src/models/station'
const { connectToDatabase } = require('../src/utils/db')

const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')

const Station = require('../src/models/station')

// csv file containing the stations needs to be placed ./data/stations
const stationsCsv:String[] = fs.readdirSync('./data/stations')

seedStations(stationsCsv)

// import csv file provided stations to the DB
// Station model can be found ../src/models/station.ts
async function seedStations(files:String[]) {
    // connect to the database
    await connectToDatabase()
    // create new Station table
    await Station.sync()

    let filename:String = '' // file to import stations

    // select the csv file -> directory must contain stations as the only csv file
    for (let file of files) {
        if (path.extname(file).toLowerCase() === '.csv') {
            filename = file
        }
    }

    if (!filename || filename === '') {
        console.log('Error, could not find csv files from path: ./data/stations.')
        console.log('Please add station dataset on .csv format to the folder ./data/stations/')
        process.exit(1)
    }

    let stations:IStation[] = [] // stations from the file
    let started:number = Date.now()
    console.log('Starting to import file: ', filename)

    // read the file
    fs.createReadStream(`./data/stations/${filename}`)
    .pipe(parse({ delimiter: ',', from_line: 2 } ))

    .on('data', function (row: any) {
        const station:IStation = {
            id: row[1],
            nimi: row[2],
            namn: row[3],
            name: row[4],
            osoite: row[5],
            adress: row[6],
            kaupunki: row[7],
            stad: row[8],
            operaattori: row[9],
            kapasiteetti: row[10],
            xCoord: row[11],
            yCoord: row[12]
        }
        stations.push(station)
    })

    // insert the stations array to db after the file has been read
    .on('end', async function() {
        console.log('Starting to import stations to DB')
        try {
            await Station.bulkCreate(stations, { ignoreDuplicates: true })
            console.log(`Imported ${stations.length} stations successfully`)        
            console.log(`Time consumed while importing data: ${(Date.now() - started) * 0.001} seconds `)
            process.exit(0)
        } catch (error:any) {
            console.log('Error...: ', error.message)
            process.exit(0)
        }
    })
}

export {}


