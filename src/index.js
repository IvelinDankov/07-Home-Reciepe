import express from "express";
import cookieParser from "cookie-parser";

import routes from "./routes.js";
import config from "./config/config.js";
import { port } from "./utils/userUtils.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();
config.hbsCofig(app);
config.mongooseConfig();

app.use(express.static("src/public"));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(authMiddleware.auth);

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...!`));
