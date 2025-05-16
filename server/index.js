import app from "./app.js";
import connectDB from "./db/connectDb.js";

const port = process.env.PORT
connectDB().
then(app.listen(port, ()=>{
    console.log("app is working on port: ", port)
}))
