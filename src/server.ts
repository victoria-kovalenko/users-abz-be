import express from 'express';
import cors from 'cors';
const { router: usersRouter } = require('./routes/users');
const { positionRouter: positionRouter } = require('./routes/positions');

const PORT = 3000;

const app = express();

app.use(cors());

app.use(usersRouter);

app.use(positionRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`API is ready on http://localhost:${PORT}`);
})

