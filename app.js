const express = require('express');
const config = require('config');
const Joi = require('joi');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || config.get('PORT');
app.use(express.json());
app.use(logger);
app.use(auth);

const courses = [
  {
    id: 1,
    name: 'node course',
  },
  { id: 2, name: 'javascript' },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
app.get('/api/courses/:id', async (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send({ msg: 'not found' });
  }
  res.send(course);
});

app.post('/api/courses', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error, value } = await schema.validate(req.body);
  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }
  const newCourse = {
    id: courses.length + 1,
    name: value.name,
  };
  courses.push(newCourse);
  res.status(201).send(newCourse);
});

app.put('/api/courses/:id', async (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send({ msg: 'not found' });
  }
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error, value } = await schema.validate(req.body);
  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }
  course.name = value.name;
  return res.status(200).send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send({ msg: 'not found' });
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  return res.status(200).send({ msg: 'deleted succesfully' });
});
