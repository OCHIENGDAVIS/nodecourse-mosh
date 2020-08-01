const express = require('express');
const Joi = require('joi');

const courses = [
  {
    id: 1,
    name: 'node course',
  },
  { id: 2, name: 'javascript' },
];

const courseRouter = express.Router();
courseRouter.get('/', (req, res) => {
  res.send('Hello World');
});

courseRouter.get('/', (req, res) => {
  res.send(courses);
});
courseRouter.get('/:id', async (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send({ msg: 'not found' });
  }
  res.send(course);
});

courseRouter.post('/', async (req, res) => {
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

courseRouter.put('/:id', async (req, res) => {
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

courseRouter.delete('/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send({ msg: 'not found' });
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  return res.status(200).send({ msg: 'deleted succesfully' });
});

module.exports = courseRouter;
