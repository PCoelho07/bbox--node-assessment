import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import router from '@/routes';

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use('/', router)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
});

createConnection()
  .then((_) => console.log("☁ [database]: Database connection established"))
  .catch((error) =>
    console.error(`⚠ [database]: Couldn't connect to the database: ${error}`)
  );
