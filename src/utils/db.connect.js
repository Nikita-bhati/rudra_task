import mongoose from "mongoose";

let connectionString = "mongodb://localhost:27017/task";

const dbconnect = async () => {
    mongoose.connect(connectionString)
        .then(console.log("db connected successfully"))
        .catch((error) => console.log("error while conneting db", error));
}
export { dbconnect }