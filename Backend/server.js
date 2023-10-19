import { app } from "./app.js";
import { connectDataBase } from "./Config/database.js";
connectDataBase().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

// Server Running on this Port
app.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
