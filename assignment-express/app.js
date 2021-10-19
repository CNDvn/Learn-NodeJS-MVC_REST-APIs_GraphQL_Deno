const express = require("express");
const path = require("path");

const userRouter = require("./routes/user");
const rootDir = require("./util/path");

const app = express();

app.use(express.static(path.join(rootDir, "public")));

app.use(userRouter);

app.listen(4000);
