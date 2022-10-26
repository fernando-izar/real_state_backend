import app from "./app";
import AppDataSource from "./data-source";

const PORT = process.env.PORT;

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
  });
})();
