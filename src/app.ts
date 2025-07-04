import express from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./http/controllers/users/routes";
import postRoutes from "./http/controllers/posts/routes";
import errorHandler from "./http/middlewares/error-handler";

const app = express();

//A quantidade de posts era muito grande, então aumentei o limite de requisição
app.use(express.json({ limit: "50mb" }));

app.use(userRoutes);
app.use(postRoutes);

app.use(cookieParser());
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
