import "dotenv/config";

import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Import routers
import { router as personRouter } from "./routers/person-router.js";
import { router as searchRouter } from "./routers/search-router.js";
import { router as locationRouter } from "./routers/location-router.js"

/* create an express app and use JSON */
const app = new express();
app.use(express.json());

// Bring in some routers
app.use("/person", personRouter, locationRouter);
app.use("/persons", searchRouter);

/* set up swagger in the root */
const swaggerDocument = YAML.load("api.yaml");
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* start the server */
const port = 8080;
app.listen(port, () => {
  console.log(`Listening in port ${port}`)
});
