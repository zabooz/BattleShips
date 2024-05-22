import express from "express";
import dotenv from "dotenv";

dotenv.config();



const app = express();
const port = process.env.PORT || 3000;
console.log("port", port);  
app.get("/", (req, res) => {
  res.send("Hallo");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

