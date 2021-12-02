require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

const routes = require('./routes');
const middlewareGlobal = require('./middlewares/Global');

require('./database');

app.use(express.json());
app.use(routes);
app.use(middlewareGlobal.notFound);
app.use(middlewareGlobal.catchAll);

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});