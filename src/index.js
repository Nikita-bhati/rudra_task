import app from "./app.js";
import { dbconnect } from "./utils/db.connect.js";

const port = 3000;

app.listen(port, async () => {
    console.log("server is running on port: ", port);
    await dbconnect();
}
 )