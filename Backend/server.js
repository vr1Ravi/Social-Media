import { app } from "./app.js";
import { connectDataBase } from "./Config/database.js";
connectDataBase().catch((err) => console.log(err));

// Server Running on this Port
app.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
