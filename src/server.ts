import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

const PORT = envVars.port || 5000;

async function main() {
  try {
    await mongoose.connect(envVars.database_url as string);

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
