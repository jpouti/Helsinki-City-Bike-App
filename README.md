# Helsinki-City-Bike-App

Helsinki City Bike App is a full stack application to display Helsinki City Bike journeys and stations data. The app is made as a pre assigment for [Solita Dev Academy](https://github.com/solita/dev-academy-2023-exercise)

#### Live demo

The app is deployed to free tier [Fly.io](https://fly.io/)
The database is also created with [Fly Postgres](https://fly.io/docs/postgres/)

Live demo: 

- https://helsinki-city-bikes.fly.dev/


#### Run locally

##### Requirements

 - [Node](https://nodejs.org/en/)
 - [Git](https://git-scm.com/)
 - [PostgreSQL database](https://www.postgresql.org/)
    - App was created with [Fly Postgres](https://fly.io/docs/postgres/), but any PostgreSQL database should be fine

##### Install

Clone the repository:

```
https://github.com/jpouti/Helsinki-City-Bike-App.git
```

Install the dependencies for frontend and backend from the root of the project by:

```
npm run install:full
```

##### Download datasets

Download datasets of journey data (data is owned by City Bike Finland):

- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv


Journey data files should be saved as .csv and placed on path:

```
city-bikes-backend/data/journeys
```

Station dataset is also required to download:

- https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
- [License and information about HSL city bicycle stations](https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902)

Station data file should be saved as .csv and placed on path:

```
city-bikes-backend/data/stations
```

##### .env & DB Connection

Create .env file to backend folder to store psql database connection string

```
city-bikes-backend/.env
```

Place following environment variables to .env file:
 - Place your postgreSQL connection string as environment variable DATABASE_URL
    -  below example of Fly Postgress connection, it might vary if different providers are used
    -  PosgreSQL documentation for installing and creating a [database](https://www.postgresql.org/docs/current/tutorial-install.html)
    -  Fly.io documentation for [Postgres Cluster](https://fly.io/docs/postgres/getting-started/create-pg-cluster/)
 - PORT can be changed, but in case other port is used, frontend proxy must be changed accordingly to ensure frontend dev mode will work properly

```
PORT=8080
DATABASE_URL=postgres://postgres:<password>@127.0.0.1:5432/<database-name>
```

Database connection can be tested by running following command on root of the project:

```
npm run test:db
```

If errors occur please check your connection string from your postgres database

It will log to console Connected to the database, connection works when everyhing goes well

##### Seed Database

Run following script from the root of the project to seed the database with previously downloaded datasets:

```
npm run seed:db
```

Invalid journeys with following conditions are not imported to the database:
- Duration is less than ten seconds
- Distance is shorter than ten meters
- Unknown Station: either return station id / departure station id does not match to any stations in database

Please notice that seeding the database with all the three datasets of journeys is taking quite a long time ( you have time to make some coffee while importing the data )

If any errors will be faced, please check that data files are saved to the folders listed above, and files are on .csv format. Also please notice that the stations are needed to import first, if the default script is not used.

Total count of items & valid items & invalid items from the data will be printed to the terminal after importing has been finished

##### Start the app

If during the .env configuration the PORT variable was set any other than default 8080, we have one more thing to do before we can start the application:

```
city-bikes-frontend/package.json
"proxy": "http://localhost:8080" -> "http://localhost:<PORT configured on .env>"
```

To run the app in development mode, run the following script on the root of the project:

```
npm run dev
```


##### Tests

Tests can be run by following commands on the root of the project:

```
npm run test:api
npm run test:e2e
```

Tests are running against the real database instead of a testing database or testing data, which is definitely usually not the ideal solution. However the app nor the tests is mutating any data, so I thought this can be acceptable.

First command is to test API endpoints, second one for end to end testing.
The app test coverage is currently very low and new tests would definitely be needed to write, to ensure better quality
Especially for the e2e testing is currently basically just setted up.

##### TODO / Improvements

- Creating better tests
- Setting up GitHub actions to lint & test and deploy
- UI improvements:
    - loading component
    - Journeys list - mobile view improvements

- Features TODO:
    - Filter the journeys
    - Statistics from a single station
    - Home page - statistics / stations map