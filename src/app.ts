import express from "express";
import cookieParser from "cookie-parser";

import routes from "./http/controllers/users/routes";
import errorHandler from "./http/middlewares/error-handler";

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(routes);
app.post("/teste", (req, res) => {
  const { data } = req.body;

  console.table(data);

  res.status(200).send();
});

app.use(cookieParser());
app.use(errorHandler);

app.listen(
  process.env.PORT,
  () => `server running on port ${process.env.PORT}`
);
