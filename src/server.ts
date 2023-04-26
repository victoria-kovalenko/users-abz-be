const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/Users');
const { routerPosition } = require('./routes/Positions');

const PORT = 3000;

const app = express();

app.use(cors());

app.use(usersRouter);

app.use(routerPosition);

app.listen(process.env.PORT || PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
})

