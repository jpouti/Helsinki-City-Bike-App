#!/bin/sh
# This script checks if the container is started for the first time

CONTAINER_FIRST_STARTUP="CONTAINER_FIRST_STARTUP"
if [ ! -e /$CONTAINER_FIRST_STARTUP ]; then
    touch /$CONTAINER_FIRST_STARTUP
    # seed the database on first startup
    npm run seed:stations && npm run seed:journeys && npm run dev
else
    npm run dev
fi