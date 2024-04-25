import { app } from "./app.js";
import { connectToDB } from "./configs/dbConfig.js";
connectToDB();
console.log(process.env.JWT_SECRET)
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


