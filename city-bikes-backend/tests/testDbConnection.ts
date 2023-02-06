const { connectToDatabase } = require('../src/utils/db')

// test if connection to the db is succesfull
const testDbConnection = async () => {
    try {
        await connectToDatabase()
        console.log('Connection works')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

testDbConnection()

export {}