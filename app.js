const path = require('path');
const express = require('express');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const courseRouter = require('./routes/courses');
const { countReset } = require('console');

const app = express();

const PORT = process.env.PORT || config.get('PORT');
const publicDir = path.join(__dirname, 'public');
app.use('/api/courses', courseRouter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));
app.use(morgan());
app.use(logger);
app.use(auth);

const courses = [
  {
    id: 1,
    name: 'node course',
  },
  { id: 2, name: 'javascript' },
];

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
