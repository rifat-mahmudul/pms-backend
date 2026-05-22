import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const PORT = config.port || 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
