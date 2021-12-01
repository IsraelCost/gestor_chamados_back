const express = require('express');

const app = express();

const routes = require('./routes');
const middlewareGlobal = require('./middlewares/Global');

require('./database');

app.use(express.json());
app.use(routes);
app.use(middlewareGlobal.notFound);
app.use(middlewareGlobal.catchAll);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});