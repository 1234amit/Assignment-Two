import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

// main function start here
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with a failure code
  }
}

main();
