const { models } = require('../models');
const helpers = require('../helpers');

const getAll = async (req, res, next) => {
  try {
    const users = await models.admin.findAll({});
    res.status(200).send(helpers.serializeUsers(users));
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not get admins',
    });
  }
}

const get = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'id not provided in params' })
      return next();
    }
    const user = await models.admin.findByPk(id);
    res.status(200).send(user.serialize());
  } catch (error) {
    res.send(error);
  }
}

const me = async (req, res) => {
  try {
    const user = await models.admin.findByPk(req.user.id);
    res.status(200).send(user.serialize());
  } catch (error) {
    res.send(error);
  }
}

const insert = async (req, res, next) => {
  try {
    const user = req.body;
    res.status(200).send({});
  } catch (error) {
    return res.send(error);
  }
}

const update = async (req, res, next) => {
  try {
    const user = req.body;
    const { id } = req.params;
    res.status(200).send({});
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getAll,
  get,
  me,
  insert,
  update
}