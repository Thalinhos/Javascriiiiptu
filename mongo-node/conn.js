import mongoose from "mongoose";

const mongoConn = async function mongoConn() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/teste', {
            maxPoolSize: 10
        })
        console.log('Connected to mongo')
    } catch (error) {
        console.error('Error connecting to mongo', error)
    }
}

export default mongoConn;

//  install mongodb comunity ZIP
//  create a new dir to use mongoDB inside the mongodb dir you downloaded
//  go to BIN paste and exec command bellow
// ./mongod --dbpath ${pathToYourDatabaseFile/theOneYouJustCreatedBefore}
//  now you just started your database in your paste/dir
//  you can connect and use mongoDB :D