const routes = require('express').Router();

routes.get('/', (req, res) => res.json({
  message: 'Hello Word!',
}));

const users = ['Fabio', 'Michele', 'Billie'];

function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'User name is required!',
    });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({
      error: 'User does not exist!',
    });
  }

  req.user = user;

  return next();
}

// query params = ?name='Robson'
routes.get('/user', (req, res) => {
  const { name } = req.query;
  users.push(name);

  return res.json(users);
});

// route params = /user/1
routes.get('/user/:index', checkUserInArray, (req, res) => res.json(req.user));

// All
routes.get('/users', (req, res) => res.json(users));

// Create
// request body = { "name": "Fabio", "age": 35 }
routes.post('/users', checkUserExist, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

// Update
routes.put('/users/:index', checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;

  return res.json(users);
});

// Delete
routes.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.send('Usuario deletado com sucesso!');
});

module.exports = routes;
