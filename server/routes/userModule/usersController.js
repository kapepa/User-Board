const express = require('express');
const usersRouter = express.Router();
const { newUser, updateUser, searchUser, deleteUser } = require('./usersService');
const { validatorUserServer } = require('../../helpers/validators')

usersRouter.post('/search', async (req, res, next) => {
  try {
    const endSearch = await searchUser(req.body)
    res.status(200).json(endSearch)
  }catch (e){
    res.status(404).send(e.name)
  }
});

usersRouter.put('/add', async (req, res, next) => {
  try {
    let response = {alert: true, warning: "Something went wrong"};
    const { update } = req.body;
    const validator = await validatorUserServer(req.body);

    if(validator && update == 0) response = await newUser(req.body);
    if(validator && update > 0) response = await updateUser(req.body);

    res.status(200).json(response)
  }catch (e){
    res.status(404).send(e.name)
  }
});

usersRouter.delete('/:key', async (req, res, next) => {
  try {
    const { key } = req.params;
    const response = await deleteUser(key)
    console.log(response)
    res.status(200).json(response)
  }catch (e){
    res.status(404).send(e.name)
  }
});

module.exports = usersRouter ;