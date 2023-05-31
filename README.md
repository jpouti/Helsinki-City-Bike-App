# Helsinki-City-Bike-App

Helsinki City Bike App is a full stack application to display Helsinki City Bike journeys and stations data. The app is made as a pre assigment for [Solita Dev Academy](https://github.com/solita/dev-academy-2023-exercise)

#### Live demo

The app is deployed to free tier [Fly.io](https://fly.io/)
The deployed database is also created with [Fly Postgres](https://fly.io/docs/postgres/)

Live demo: 

- https://helsinki-city-bikes.fly.dev/


#### Run locally in development mode

##### Requirements

 - [Node](https://nodejs.org/en/)
 - [Git](https://git-scm.com/)
 - [Docker](https://docs.docker.com/get-docker/)

##### Install

Clone the repository:

```
https://github.com/jpouti/Helsinki-City-Bike-App.git
```

Install the dependencies for the project:

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

##### Build container for backend with database

Run following command on the root directory to build backend container

```
cd city-bikes-backend/data/journeys && docker compose -f docker-compose.dev.yml build
```

Run the container by following command:

```
docker compose -f docker-compose.dev.yml up && cd ..
```

Postgress database with stations and journeys data will be populated when container is run at the first time.

Please notice that populating the database will take a few minutes.

Invalid journeys with following conditions are not imported to the database:
- Duration is less than ten seconds
- Distance is shorter than ten meters
- Unknown Station: either return station id / departure station id does not match to any stations in database.

After the populating is done, the server will start on PORT 8080

##### Start the frontend

Run the following command to start the client on the root of project:

```
npm run dev:client
```

The app open on the browser on localhost:3000

##### .env & setup testing

Create .env file to backend folder to store psql database connection string

```
city-bikes-backend/.env
```

Place following environment variables to .env file:
 - Place local postgreSQL connection string as environment variable TEST_DATABASE_URL
 - PORT can be changed, but in case other port is used, frontend proxy must be changed accordingly to ensure frontend dev mode will work properly

```
PORT=8080
TEST_DATABASE_URL="postgres://postgres:example@localhost:5432/app"
```

##### Tests

Tests can be run by following commands on the root of the project:

```
npm run test:api
npm run test:e2e
```

Tests are running against the development database in the container, therefore the container needs to be running during the tests.

First command is to test API endpoints, second one for end to end testing.

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