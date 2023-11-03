import mongoose from "mongoose";
import mongoConn from "./conn.js";
import db1 from "./model.js";

const go = async () => {
    try {
        mongoConn()
        const data = await db1.find()
        console.log(data)
    } catch (error) {
        console.error(error)
    }finally{
        mongoose.disconnect()
        console.log("Connection closed")
    }
}

go()


// easy example to get connection and ship data from mongodb/nodejs
// i use finnally and disconnect, but you can create a pool conn
// add { maxPoolSize: 10 } on your string connection
// then you have your pool to go with