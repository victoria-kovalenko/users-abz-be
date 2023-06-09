const express = require('express');
const cors = require('cors');
const routerPosition  = require('./routes/positions');
const { usersRouter } = require('./routes/users');

const PORT = 3000;

const app = express();

app.use(cors());

app.use(usersRouter);

app.use(routerPosition.positionRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
})

