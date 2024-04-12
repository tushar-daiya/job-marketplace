import { app } from "./app.js";
import { connectToDB } from "./configs/dbConfig.js";
connectToDB();
app.listen(8123, () => {
  console.log("Server is listening on port 3000");
});


